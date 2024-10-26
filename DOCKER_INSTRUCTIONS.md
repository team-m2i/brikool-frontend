To deploy the application in a Docker container, you need to have Docker installed on your machine. If you don't have Docker installed, you can download it from the official website: https://www.docker.com/products/docker-desktop

### Follow this steps:
- Generate access token from GitHub:
  - Go to your GitHub account settings.
  - Click on Developer settings.
  - Click on Personal access tokens.
  - Click on Generate new token.
  - Give the token a name and select the scopes.
  - Click on Generate token.
  - Copy the token and save it in a secure place.
- login to github container registry using the following command: ( use the access token as password)
```bash
docker login ghcr.io
```
- Create image from Dockerfile using the following command:
```bash
docker build . --platform linux/amd64 -t ghcr.io/<username>/<image-name>:<tag>
```
For example:
```bash
docker build . --platform linux/amd64 -t ghcr.io/codeonym/brikool-app-frontend:latest
```
- To run the container use the following command:
```bash
docker run -p 3000:3000 ghcr.io/<username>/<image-name>:<tag>
```
For example:
```bash
docker run -p 3000:3000 ghcr.io/codeonym/brikool-app-frontend:latest
```
- #### Notice
To load the environment variables from the `.env.local` file, you need to add the following option to the `docker run` command:
```bash
sudo docker run -p 3000:3000 --env-file .env.local ghcr.io/codeonym/brikool-app-frontend:latest  
```

You can access the application using the following URL:
```
http://localhost:3000
```
- To push the image to the GitHub container registry use the following command:
```bash
docker push ghcr.io/<username>/<image-name>:<tag>
```
For example:
```bash
docker push ghcr.io/codeonym/brikool-app-frontend:latest
```
