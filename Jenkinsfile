pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'omwarkri123'
        IMAGE_NAME = 'myportfolio'
        REPO_URL = 'https://github.com/omwarkari123/Myportfolio.git'
        EC2_HOST = '65.1.3.190'
        EC2_USER = 'ubuntu'
        IMAGE_TAG = "${env.BUILD_NUMBER ?: 'latest'}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: env.REPO_URL
            }
        }

        stage('Frontend Build Validation') {
            steps {
                sh '''
                    cd frontend
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Backend Dependency Validation') {
            steps {
                steps {
                    sh '''
                        cd backend
                        npm ci
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:frontend-${IMAGE_TAG} ./frontend
                    docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:backend-${IMAGE_TAG} ./backend
                    docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:python-${IMAGE_TAG} -f Dockerfile.python .
                '''
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKERHUB_USERNAME',
                    passwordVariable: 'DOCKERHUB_PASSWORD'
                )]) {
                    sh '''
                        echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
                        docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:frontend-${IMAGE_TAG}
                        docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:backend-${IMAGE_TAG}
                        docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:python-${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Copy Compose File') {
            steps {
                sshagent(['ec2-ssh']) {
                    sh '''
                        scp -o StrictHostKeyChecking=no docker-compose.yml ${EC2_USER}@${EC2_HOST}:/home/${EC2_USER}/docker-compose.yml
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} <<EOF
                        export DOCKERHUB_USER=${DOCKERHUB_USER}
                        export IMAGE_NAME=${IMAGE_NAME}
                        export IMAGE_TAG=${IMAGE_TAG}
                        docker login -u "${DOCKERHUB_USER}" --password-stdin <<< "${DOCKERHUB_PASSWORD}"
                        docker compose -f /home/${EC2_USER}/docker-compose.yml pull
                        docker compose -f /home/${EC2_USER}/docker-compose.yml up -d --remove-orphans
                        EOF
                    '''
                }
            }
        }
    }
}