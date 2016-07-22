#PANDA FB

##Here we go! Let's get some permanent access token for our pages

##How to install?

###1. Clone the project

###2. Install Dependencies

`npm install`

###3. Configure it!

Open config.js and you will see:

```javascript
module.exports = {
	graphVer: '2.7',
	appId: {your_app_id_here},
	appSecret: {your_app_secret_here},
	limit: 9999
}
```

###4. Run it

`npm start`

## How to use?

###Open the project on your browser http://localhost:3838 (default port but you can change!)
![Open panda-fb](https://github.com/poepanda/panda-fb/raw/master/docs/images/open-the-app.png "Open the app")

###Select permissions you want to get and click "GET TOKEN"
You can add the addition permissions in the text fields
![Open panda-fb](https://github.com/poepanda/panda-fb/raw/master/docs/images/select-perm.png "Open the app")

###Go through FB Login and approve the permission request
![Open panda-fb](https://github.com/poepanda/panda-fb/raw/master/docs/images/facebook-approve.png "Open the app")

###Get the results :apple:
![Open panda-fb](https://github.com/poepanda/panda-fb/raw/master/docs/images/result.png "Open the app")
