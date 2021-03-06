# Greenba Deploy Instructions for linux dropplet with docker

Droplet password: 
Ip address: 
Password: 

1. Create droplet using docker
2. Login using powershell

ssh root@ipaddress

3. Create new docker compose file

sudo nano docker-compose.yml

4. Copy our docker-compose: 

services:

  redis:
    image: redis:latest
    ports:
      - 6379:6379
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - redis-data:/data

  redis-commander:
    image: rediscommander/redis-commander:latest
    environment:
      - REDIS_HOSTS=local:redis:6379
      - HTTP_USER=root
      - HTTP_PASSWORD=secret
    ports:
      - 8081:8081
    depends_on:
      - redis

  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: Nazarre5024!
      POSTGRES_USER: appuser
    ports: 
      - 5432:5432

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080

volumes:
  redis-data:
  
5. Run compose command to start docker

docker-compose up -d

6. install and configure apache

sudo apt update
sudo apt install apache2
a2enmod proxy proxy_http proxy_html rewrite
systemctl restart apache2
sudo ufw app list
sudo ufw allow 'Apache Full'
sudo systemctl status apache2

7. Allow ports through the firewall to allow manage PostgreSQL and redis via the ports

sudo ufw allow 8080/tcp
sudo ufw allow 8081/tcp

8. Test you can access to apache

put the Ip addres:  on your web browser

9. Create a new directory that will contain our published dotnet app and assign rights to the user:

sudo mkdir /var/greenba
sudo chown -R $USER:$USER /var/greenba

10.Create a new config file for the greenba app:

sudo nano /etc/apache2/sites-available/greenba.conf

11. Paste the following configuration wich will set up a reverse proxy in the kestrel server:

<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        ProxyPreserveHost On
        ProxyPass / http://127.0.0.1:5000/
        ProxyPassReverse / http://127.0.0.1:5000
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>

12. Enable the greenba site by running this commands:

a2ensite greenba
ls /etc/apache2/sites-enabled
a2dissite 000-default
systemctl reload apache2

13. Install the deploy reload extension. Create a settings.json file in the .vscode 
directory and update the IP address and 
password for your server:

{
	"deploy.reloaded": {
		"packages": [
			{
				"name": "Version 1.0.0",
				"description": "Package version 1.0.0",
				
				"files": [
					"publish/**"
				]
			}
		],
		
		"targets":[
			{
				"type": "sftp",
				"name": "Linux",
				"description": "SFTP folder",
				
				"host": "ipaddress", "port": 22,
				"user": "root", "password": "your password",
				
				"dir": "/var/greenba",
				"mappings": {
					"publish/**": "/"
				}
			}
		]
	}
}

14. Change the loggining level for the appsettings.json to information

15 Republish the app with changes by running this command

dotnet publish -C Release -o publish greenba.sln

16. Deploy the files using command pallete -> deploy reloaded -> deploy package

17. Back on the linux server create a service config for kestrel server:

sudo nano /etc/systemd/system/greenba-web.service 

18. Update the configuration for your API keys, replace and then paste the config into 
the nano editor

[Unit]
Description=Kestrel service running on Ubuntu 20.04
[Service]
WorkingDirectory=/var/greenba
ExecStart=/usr/bin/dotnet /var/greenba/GreenbaAPI.dll
Restart=always
RestartSec=10
SyslogIdentifier=greenba
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment='Token__Key=CHANGE ME TO SOMETHING SECURE' 
Environment='Token__Issuer=http://ipaddress'
Environment='ConnectionStrings__DefaultConnection=Server=localhost; Port=5432;User Id=appuser; Password=yourPassword; Database=greenba'
Environment='ConnectionStrings__IdentityConnection=Server=localhost; Port=5432;User Id=appuser; Password= yourPassword; Database=identity'
Environment='ConnectionStrings__Redis=localhost'
Environment=ApiUrl=http://ipAddress/
[Install]
WantedBy=multi-user.target

20. Install NET runtime in linux

-https://docs.microsoft.com/en-gb/dotnet/core/install/linux-ubuntu#2004

wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

21. Restart Journal service

systemctl restart systemd-journald

22. Start kestrel service:

sudo systemctl start greenba-web.service

23. install netstat

apt install net-tools

24. Check it is started by running:

netstat -ntpl

25. Check the journal 

journalctl -u greenba-web.service --since "5 min ago"
