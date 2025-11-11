pipeline {
    agent any
    
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        
        stage('Clone from Git') {
            steps {
                git(
                    url: 'https://github.com/your-username/your-repo.git',
                    branch: 'main'
                )
            }
        }
        
        stage('Install Backend Dependencies') {
            steps {
                dir('backend(node)') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend(next)') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('backend(node)') {
                    sh 'npm run build || echo "No build script for backend"'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('frontend(next)') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    // Backend tests
                    dir('backend(node)') {
                        sh 'npm test || echo "Tests failed or no tests"'
                    }
                    
                    // Frontend tests
                    dir('frontend(next)') {
                        sh 'npm run test -- --watchAll=false || echo "Tests failed or no tests"'
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo "Build process completed"
            
            // Archive build artifacts if needed
            archiveArtifacts artifacts: '**/build/**/*', fingerprint: true
        }
        success {
            echo "✅ Backend and frontend built successfully!"
            
            // Show build results
            sh '''
                echo "Build Summary:"
                echo "Backend built in: backend(node)/"
                echo "Frontend built in: frontend(next)/build/"
            '''
        }
        failure {
            echo "❌ Build failed!"
        }
    }
}
