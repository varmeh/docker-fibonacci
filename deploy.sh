
# Build production images
docker build -t varxmeh/fibonacci-client:latest -t varxmeh/fibonacci-client:$SHA -f ./client/Dockerfile ./client
docker build -t varxmeh/fibonacci-server:latest -t varxmeh/fibonacci-server:$SHA -f ./server/Dockerfile ./server
docker build -t varxmeh/fibonacci-worker:latest -t varxmeh/fibonacci-worker:$SHA -f ./worker/Dockerfile ./worker

# Push images to docker hub
docker push varxmeh/fibonacci-client:latest
docker push varxmeh/fibonacci-server:latest
docker push varxmeh/fibonacci-worker:latest
docker push varxmeh/fibonacci-client:$SHA
docker push varxmeh/fibonacci-server:$SHA
docker push varxmeh/fibonacci-worker:$SHA

# Apply all k8s configuration
# Kubectl is already configured on travis via gcloud in before installation step
kubectl apply -f k8s --recursive
kubectl set image deployments/server-deployment server=varxmeh/fibonacci-server:$SHA
kubectl set image deployments/client-deployment client=varxmeh/fibonacci-client:$SHA
kubectl set image deployments/worker-deployment worker=varxmeh/fibonacci-worker:$SHA

