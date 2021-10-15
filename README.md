# CZ3003-HUF
Software Project for Course CZ3003 by Team HUF

# Frontend Setup
Go to frontend directory: 
```
cd frontend
```

## 1. Install Dependencies
You will need to install `Node.js`, `npm` and `yarn` to manage JavaScript packages that we are going to use.

**Download & Install Node.js & npm**  
https://nodejs.org/en/

**Install Yarn**
```
npm install -g yarn
```
**Install node modules in package.json**  
Make sure you are in the **`frontend` directory** before you do this.
```
yarn install
```
## 2. Happy hacking!
You can run the app in the development mode by using
```
yarn start
```
Open http://localhost:3000 to view it in the browser.  

To build the app for production to the build folder.
```
yarn build
```

# Backend Setup
## 1. Install Dependencies
- Python 3.9.0
- MYSQL Workbench 

## 2. Setting Up the Virtual Environment
1. Set up a new virtual environment
	> python -m venv env

2. Activate the virtual environment
	> \env\Scripts\activate.bat

3. Install required libraries
    > pip install -r requirements.txt 

## 3. Set-up MySQL Workbench
1. Create new schema
	> Name: project_huf

2. Create authentication user
	> create user admin identified by ‘password';

	> grant all on project_huf.* to ‘admin’@’%’;
	
	> flush priviledges;

## 4. Setting up Project 
1. Migrate all the default Django tables to your MySQL schema.
	> python manage.py migrate

## 4. Running The Server
1. > python manage.py runserver
2. Open http://localhost:8000
