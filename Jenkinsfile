pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "omwarkri123"
        IMAGE = "myportfolio"
        EC2_HOST = "65.1.3.190"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/omwarkari123/Myportfolio.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/$IMAGE:backend-v1 ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/$IMAGE:frontend-v1 ./frontend'
            }
        }

        stage('Build Python') {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/$IMAGE:python-v1 -f Dockerfile.python .'
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin

                    docker push omwarkri123/myportfolio:backend-v1
                    docker push omwarkri123/myportfolio:frontend-v1
                    docker push omwarkri123/myportfolio:python-v1
                    '''
                }
            }
        }

        stage('Copy Compose File') {
            steps {
                sshagent(['ec2-ssh']) {
                    sh '''
                    scp -o StrictHostKeyChecking=no docker-compose.yml ubuntu@$EC2_HOST:/home/ubuntu/
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['ec2-ssh']) {

                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@$EC2_HOST << EOF

                    docker login

                    docker compose pull

                    docker compose up -d

                    EOF
                    '''
                }
            }
        }
    }
}