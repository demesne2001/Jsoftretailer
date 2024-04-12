
pipeline {
    agent any
   
    
    stages {
        stage('checkout') {
            steps {
               checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'demesne2001', url: 'https://github.com/demesne2001/JSoftWeb.git']])
                echo 'checkout done'
            }
        }
        stage('Docker Image') {
            steps {
                
                script{
                    def a=0
                    bat 'docker build . -f dockerfile.txt -t  jsoftfront'
                    a=1
                    if(a>0)
                    {
                         bat 'docker stop jsoftfront'
                         bat 'docker rm jsoftfront'
                    }
                }
                echo 'Docker Image done'
            }
        }
        stage('Docker Run') {
            steps {
                script{
                    bat 'docker run -p 3035:3035 -d --name jsoftfront jsoftfront'
                }
                echo 'Docker Running'
            }
        }
        stage('Docker push') {
            steps {
                script{
                    bat 'docker login -u patelom0910 -p 09102001Om'
                }
                echo 'Docker push done'
            }
        }
    }
}
