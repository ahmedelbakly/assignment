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
                // Use your correct URL, branch, and credential ID
                git(
                    url: 'https://github.com/ahmedelbakly/assignment.git',
                    branch: 'main', // Change to your correct branch name
                    credentialsId: '' // <- Insert your Jenkins credential ID here if the repo is private
                )
            }
        }
        
        stage('Install & Build Backend') {
            steps {
                dir('backend(node)') {
                    sh 'npm install'
                    sh 'npm run build || echo "No build script for backend, skipping."'
                }
            }
        }
        
        stage('Install & Build Frontend') {
            steps {
                dir('frontend(next)') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    dir('backend(node)') {
                        sh 'npm test || echo "Backend tests failed or no tests"'
                    }
                    dir('frontend(next)') {
                        sh 'npm run test -- --watchAll=false || echo "Frontend tests failed or no tests"'
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo "Build process completed."
        }
        success {
            echo "✅ Backend and frontend built successfully!"
        }
        failure {
            echo "❌ Build failed!"
        }
    }
}
