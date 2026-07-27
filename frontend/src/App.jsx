import './App.css'

const skillCategories = [
  { title: 'Cloud', items: 'AWS — EC2, EKS, ECS Fargate, ECR, S3, VPC, IAM, RDS, Route 53, ALB, ACM, CloudWatch' },
  { title: 'Containers', items: 'Docker, Kubernetes (EKS), Helm, Amazon ECR, Docker Compose' },
  { title: 'CI/CD', items: 'Jenkins, GitHub Actions, AWS CodePipeline, CodeBuild — end-to-end pipeline design' },
  { title: 'IaC', items: 'Terraform, AWS CloudFormation — multi-resource AWS provisioning' },
  { title: 'Config Mgmt', items: 'Ansible' },
  { title: 'Monitoring', items: 'Prometheus, Grafana, AWS CloudWatch Logs & Alarms' },
  { title: 'Languages', items: 'Python (Django), Bash scripting' },
  { title: 'OS / VCS', items: 'Linux (Ubuntu), Git, GitHub' },
]

const projects = [
  {
    title: 'Share-Task — Django Task Management App on AWS EKS',
    stack: 'Django · Docker · Kubernetes · Jenkins · Terraform · AWS EKS · ECR · PostgreSQL · Redis',
    achievements: [
      'Deployed a multi-tier Django application on AWS EKS with 2-replica rolling-update strategy ensuring zero-downtime deployments.',
      'Built end-to-end Jenkins CI/CD pipeline: code checkout → Docker build → ECR push → kubectl apply → rollout status verification.',
      'Diagnosed and resolved production CrashLoopBackOff caused by SECURE_SSL_REDIRECT=True inside pod — ALB handles TLS termination; fixed by making the setting env-configurable.',
      'Tuned Kubernetes startup, liveness, and readiness probes — corrected scheme mismatch (HTTPS vs HTTP) that caused probe timeouts and pod restarts.',
      'Provisioned AWS infrastructure using Terraform: EKS cluster, VPC, IAM roles, ECR repository, reducing manual setup by 70%.',
      'Configured NGINX Ingress + cert-manager for automated Let\'s Encrypt TLS on share-task.xyz with Route 53 DNS management.',
      'Set up Kubernetes HPA for CPU/memory-based auto-scaling and integrated AWS CloudWatch for container log aggregation.',
      'Implemented init containers for db-migrate and collectstatic to enforce correct startup ordering before main app container starts.',
    ],
  },
]

const experiences = [
  {
    role: 'DevOps Engineer Trainee',
    company: 'IT Vedant',
    duration: '6-Month Hands-on Training',
    achievements: [
      'Designed and implemented AWS cloud infrastructure including VPC, Subnets, Route Tables, Internet Gateway, and NAT Gateway for secure, scalable network environments.',
      'Provisioned and managed compute resources using AWS EC2; deployed and configured EKS clusters for containerized workloads.',
      'Built, optimized, and managed Docker images using Dockerfiles; containerized applications for consistent and portable cloud deployments.',
      'Deployed containerized applications on Kubernetes (EKS); managed Deployment manifests, Services, and pod lifecycle operations.',
      'Implemented automated CI/CD pipelines using Jenkins; integrated GitHub repositories to trigger Continuous Integration and Continuous Deployment workflows.',
      'Provisioned cloud infrastructure as code using Terraform; automated environment setup ensuring repeatable, version-controlled deployments.',
    ],
  },
]

const strengths = [
  { category: 'Kubernetes Troubleshooting', items: 'CrashLoopBackOff, probe failures, rolling updates' },
  { category: 'CI/CD Pipeline Design', items: 'Jenkins, GitHub Actions, AWS CodePipeline' },
  { category: 'AWS Infrastructure (IaC)', items: 'Terraform, EKS, ECS, ALB, Route 53, ACM' },
]

function App() {
  return (
    <div className="portfolio-shell">
      <header className="hero-section">
        <nav className="top-nav">
          <div className="brand">Om Warkari</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div>
            <p className="eyebrow">DevOps Engineer • AWS • Kubernetes • Production-Ready</p>
            <h1>
              Results-driven <span>DevOps Engineer</span> building resilient cloud systems.
            </h1>
            <p className="hero-copy">
              I specialize in deploying containerized applications on AWS EKS and ECS Fargate, designing end-to-end CI/CD pipelines with Jenkins and GitHub Actions, and provisioning scalable infrastructure with Terraform. With hands-on production experience troubleshooting CrashLoopBackOff, probe failures, and zero-downtime deployments, I focus on automation, reliability, and observability.
            </p>
            <div className="contact-info">
              <span>📧 owarkri710@gmail.com</span>
              <span>📞 +91 7620290632</span>
              <span>📍 Maharashtra, India</span>
            </div>
            <div className="social-links">
              <a href="https://github.com/omwarkri" target="_blank" rel="noreferrer">🔗 GitHub</a>
              <a href="https://www.linkedin.com/in/om-warkri" target="_blank" rel="noreferrer">💼 LinkedIn</a>
            </div>
            <div className="hero-actions">
              <a className="button primary" href="#projects">View Projects</a>
              <a className="button secondary" href="#contact">Get in Touch</a>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-image-wrapper">
              <img src="/om-profile.jpg" alt="Om Warkari" className="profile-image" onError={(e) => { e.target.src = '/om-profile.svg'; }} />
            </div>
            <h3>Om Warkari</h3>
            <p>DevOps Engineer</p>
            <p className="role-desc">AWS · Linux · Kubernetes · Troubleshooting</p>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="section-card">
          <h2>Professional Summary</h2>
          <p className="full-text">
            Results-driven DevOps Engineer with hands-on production experience deploying and managing containerized applications on AWS EKS and AWS ECS Fargate. Proficient in designing end-to-end CI/CD pipelines using Jenkins and GitHub Actions, provisioning cloud infrastructure with Terraform, and troubleshooting Kubernetes workloads in live environments. Experienced in diagnosing and resolving production issues including CrashLoopBackOff, startup probe failures, rolling-update timeouts, and stale ECR image tags causing 503 errors. Hands-on with NGINX Ingress, cert-manager, Let's Encrypt TLS, AWS ALB, Route 53, and CloudWatch log-based monitoring. Comfortable working across the full DevOps lifecycle — from local Docker builds to production EKS deployments — with a strong focus on automation, reliability, and zero-downtime delivery. Seeking a Junior DevOps Engineer role to contribute to scalable, automated, and reliable cloud systems.
          </p>
        </section>

        <section id="skills" className="section-card">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            {skillCategories.map((category) => (
              <div key={category.title} className="skill-category">
                <h4>{category.title}</h4>
                <p>{category.items}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section-card">
          <h2>Featured Projects</h2>
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-header">
                <h3>{project.title}</h3>
                <p className="project-stack">{project.stack}</p>
              </div>
              <ul className="achievements-list">
                {project.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="experience" className="section-card">
          <h2>Work Experience</h2>
          {experiences.map((exp) => (
            <div key={exp.role} className="experience-block">
              <div className="exp-header">
                <h3>{exp.role}</h3>
                <p className="company-info">{exp.company} • {exp.duration}</p>
              </div>
              <ul className="achievements-list">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="section-card">
          <h2>Education & Certifications</h2>
          <div className="details-grid">
            <div>
              <h3>Education</h3>
              <p><strong>Bachelor of Computer Application (BCA)</strong></p>
              <p>Amravati University, India</p>
            </div>
            <div>
              <h3>Certifications</h3>
              <p><strong>DevOps Course</strong></p>
              <p>IT Vedant</p>
            </div>
          </div>
        </section>

        <section className="section-card">
          <h2>Key Strengths</h2>
          <div className="strengths-grid">
            {strengths.map((strength) => (
              <div key={strength.category} className="strength-item">
                <h4>{strength.category}</h4>
                <p>{strength.items}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section-card contact-card">
          <div>
            <h2>Let's build something remarkable</h2>
            <p>I'm actively seeking a Junior DevOps Engineer role to contribute to scalable, automated, and reliable cloud systems. Open to discussing DevOps strategies, cloud architecture, and infrastructure automation opportunities.</p>
          </div>
          <div className="contact-actions">
            <a href="mailto:owarkri710@gmail.com" className="button primary">Send Email</a>
            <a href="https://github.com/omwarkri" target="_blank" rel="noreferrer" className="button secondary">View GitHub</a>
            <a href="https://www.linkedin.com/in/om-warkri" target="_blank" rel="noreferrer" className="button secondary">Connect on LinkedIn</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Om Warkari | DevOps Engineer | AWS • Kubernetes • Terraform</p>
      </footer>
    </div>
  )
}

export default App
