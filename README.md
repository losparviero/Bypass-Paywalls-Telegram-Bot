# Bypass Paywalls on Telegram

###### _A simple personal project to learn bot development for Telegram using the [Grammy](https://github.com/grammyjs/grammY) framework._

###### _A Chrome extension for the same can be found [here](https://github.com/Grahtni/Bypass-Paywalls)._

##### Telegram bot to unblock paywalled articles on web sites using the 12ft.io proxy.

#### Install (Self Host):

1. Clone repo and run in folder ```npm i```

2. Edit .env file to include your bot token.

3. Open terminal in code directory and run ```node bot.js```

4. Keep it running by keeping the terminal open for the duration of time you want to use the bot.

>_*Optional:* Use a startup manager like PM2 to conveniently run the bot persistently._

_*Alternatively you can just use my instance at [@nopaywallbot](https://nopaywallbot.t.me/)*_ 

#### Uninstall:

Run ```rm -rf <code directory>/*```

>_*Note:* Be careful with this command, if you don't know it don't use it and delete from file explorer._

#### Cloud Host

_TBA_

#### Features to add:

Docker container

One click deploy to cloud

Switch to Webhook

Export to AWS Lambda serverless function

#### License

###### The contents of this work are protected by GNU AGPL 3.0.



# Repo Name

One liner description.

<br>

### Install

1. Clone git repo.
2. Run ```npm i``` in project folder. This will install the required dependencies.
3. Populate .env file with bot token & bot dev ID (optional).

#### Bot token can be obtained from @BotFather.

#### Bot dev ID refers to the user ID of your Telegram account. This is needed for logging purposes.

4. Run ```node bot``` to start the bot.

#### It's advisable to run the bot using PM2 or any startup manager for persistent execution, as this ensures you won't have to have the terminal open. You can set up auto-start as well. Or pass a cron job.

<br>

### Uninstall

1. Use ```rm -rf```.

*Note:* If you're unfamiliar with this command, delete project folder from file explorer.

<br>

### Mechanism

The bot takes data, parses input, uses the 'insert' lib to process data and returns a value.

<br>


    Copyright (C) 2023  Zubin

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

