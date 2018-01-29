// builds lunr
var index = lunr(function () {
  this.field('title')
  this.field('content', {boost: 10})
  this.field('category')
  this.field('tags')
  this.ref('id')
});

index.add({
  title: "Collate Google Form responses into Google Docs",
  category: "code",
  content: "For Ela Conf 2016 and 2017, we created a Google Form to collect speaker feedback. The form had the following fields:\n\n\n  For which session are you leaving feedback? (A select box with all the possible talks)\n  What did you learn?\n  What did you find confusing?\n  What’s one thing the speaker(s) can improve their talk for next time?\n\n\nWe then read through the responses, summarized them into a personal report for each speaker, and then sent the feedback to each speaker after the conference.\n\nReading through a spreadsheet with 290 rows with feedback for 20 sessions wasn’t going to be fun, so I wrote spreadsheet-collator that would:\n\n\n  Read the spreadsheet.\n  Group the data based on the talk title.\n  Format the data.\n  Write the data to its own Google Doc file.\n\n\nThe script worked beautifully and saved us loads of time. Here’s how you can use it:\n\nCreate your form\n\nCreate your form in Google Sheets. (For this example, I made a vegetable feedback form.)\n\n\n\nOnce you create the form, click the “Responses” tab and then the Google Sheets icon to create a Google spreadsheet to store your data.\n\nWhile you have your spreadsheet open, you’ll want to jot down a few credentials:\n\n\n  The spreadsheet ID, which is that string of characters in the URL:\n\n  The spreadsheet range, which is the tab name and cell ranges you want to read. For this example we want Vegetable Feedback!B:D:\n\n  The name of the column header that holds the rows that will be the titles of your Google docs:\n\n\n\nCreate a Google Drive folder\n\nCreate a folder in Google Drive that will ultimately be the home for the docs. You can also store your form and form response spreadsheet here.\n\n\n\nWhile you’re here, you also want to jot down the folder’s ID, which is that string of characters in the URL:\n\n\n\nConfigure the collator\n\nAfter you’ve cloned the spreadsheet-collator repo, open up config.js, and update the config with the values you collected above.\n\nRun the collator\n\nFollowing the steps in the README, you’ll need to first authenticate your account so that script can access your spreadsheet and create files. Then you can run the collator.\n\n\n\nOpen up your Google Drive folder to see your freshly created documents:\n\n\n\nAnd then open up a doc to see your collated data:\n\n\n\nCustomize the collator\n\nThis script is great for sorting comments and with a little editing it can process other types of data.\n\nTry editing this section to change the output the your docs. For example, you can add additional text or calculate and then display the average for a quantitative question.\n\nHappy collating!\n",
  tags: ["API","workflow","Ela Conf"],
  id: 0
});
index.add({
  title: "Create emails from a Google spreadsheet",
  category: "code",
  content: "For this past Ela Conf, we had a record number of proposals submitted, which also (unfortunately) meant a record number of rejection emails to be sent. In the past, we sent these individually, but the sheer volume was going to take hours. We didn’t want to send a mass email because it was important to us to address the proposal submitter by their name and reference their submitted talk title(s).\n\nI found a tutorial (which is curiously incorrectly titled) that can send emails from a Google spreadsheet and it worked very well for us.\n\nI repurposed this script once again at Mapbox as part of our Gender Minority Employee Resource Group’s mentorship program. We matched 64 pairs and we used this script to send an email to introduce the mentor and mentee. This time I updated the script to draft emails so that we could check each email before we sent it out.\n\nI love this script because it feels like you’re creating Mad Libs.\n\n\n\n\n\nHere’s how you can use it.\n\nSet up your spreadsheet\n\nAt a minimum, you’ll need a row to hold the email addresses. From there, you’ll want to store data in separate rows, for example, a row for the person’s name and other specific information that you’d like to pop into a template. This script also assumes that your first row of data contains titles for each column.\n\nAdd one last column to your spreadsheet called “Email status” or similar. You’ll use this column in the script to indicate if an email has already been drafted or sent to keep the script from creating duplicates.\n\nFor this example, I’ve created a fake business that matches you with a vegetable. New year, new me.\n\n\n\nSet up the script\n\nOpen up the tab of a Google spreadsheet that has your data.\n\n\n  Click Tools &gt; Script editor... from the toolbar.\n  Replace the code in the Code.gs tab with the following script.\n  Click the save icon or click File &gt; Save from the toolbar.\n  Enter a project name, such as “Draft emails”.\n\n\nCustomize the script\n\nMake the script your own by specifying which columns have which data, assigning variables, and using those variables to weave together your message.\n\nCheck out the createDraft documentation to learn about more options. For example, you can cc or bcc others on the emails or add a reply-to address.\n\nThe current script is set up to create drafts. If you’d prefer the script to send emails instead, swap out the GmailApp.createDraft() function with:\n\nMailApp.sendEmail(\n  'hello@email.com', // recipient\n  'To my subscribers', // subject\n  'Dear subscriber,\\nI love you.\\nYours,\\nKaty' // body\n);\n\n\nCheck out the sendEmail documentation to learn about more options you can use to send emails with this function.\n\nAuthenticate the script\n\nThe first time you run the script you’ll need to grant permission for it to read the spreadsheet and then draft or send emails from your Gmail account:\n\n\n  Click the play icon or click Run &gt; Run function &gt; draftMyEmails from the toolbar.\n  A window should appear. Click “Review Permissions.”\n  Select the account you want to authenticate.\n    \n      You may get a warning since this isn’t an official script.\n      Review the code to get an idea of how it works and how it will interact with your account.\n      Once you feel comfortable, from the warning screen, click “Advanced” then “Go to Draft emails (unsafe)” (or whatever you named your script). This will get you through to the next screen.\n    \n  \n  Click “Allow” to grant the script access to the stated parts of your account.\n\n\nRun the script\n\nAfter you authenticate, the script will run and you should find as many emails in your Gmail draft folder:\n\n\n",
  tags: ["API","workflow","Ela Conf"],
  id: 1
});
index.add({
  title: "AwayBot, an out of office helper",
  category: "code",
  content: "I made a command line tool to run when I go into labor, AwayBot. This bot can also be used for all types of leave that take you out of the office for a while.\n\nWhen I run the command away the bot will:\n\n\n  Calculate my first day back based on the amount of my leave and the day I go into labor\n  Update my Slack status\n  Set me away in Slack\n  Set a vacation response in Gmail\n  Send an email to my team to let them know my leave is starting\n  Create an event on my calendar for the duration of my leave\n\n\n\n\nSetting up\n\nI created a config.js file to store all my settings and to (hopefully) make it reusable by other parents or anyone taking a significant amount of leave. You can clone the repo and edit these settings based on the amount of leave you have and messages for each step.\n\nYou’ll need to grant the scripts quite a bit of access to your Gmail and calendar, but rest assured that all the code that’s accessing your account is in the repo, run locally, and your credentials are stored on your machine. Also, I’m going to have a baby soon so I’m too busy to hack you. (Just kidding. I would never hack you, dear reader.)\n\nI recommend following the set up found in the README, entering some sample data in the config, and authenticating a personal account to get a feel for what all the messages will look like.\n\nWe’ll see\n\nI’m not sure if I’ll end up using it when the baby is on the way, but it sure was fun to build!\n",
  tags: ["API","mom stuff","bots"],
  id: 2
});
index.add({
  title: "2017 Fall",
  category: "playlists",
  content: "Listen on Spotify\n\n\n  Half Hour, Yumi Zouma\n  Holy Holy, Wye Oak\n  Orca, Y La Bamba\n  Gassed, WESLEE\n  Too Dark, Frankie Cosmos\n  Fade, Angelo De Augustine\n  Go Honey, Luwten\n  Your Hand Holding Mine, Yellow Days\n  Come and See, Lean Year\n  Deathless, Ibeyi, Kamasi Washington\n  Emergency Blimp, King Krule\n\n",
  tags: [],
  id: 3
});
index.add({
  title: "LIFX + AWS IoT Button",
  category: "code",
  content: "When our son is born next year, we’re anticipating late night feedings and diapers changes which may mean needing to turn on our smart bulbs without fumbling for our phones or asking Alexa.\n\n(Or honestly, we don’t know. We’re new.)\n\nI bought an AWS IoT button as it appeared to be the least expensive smart button option that wasn’t dependent on a hub or iPhone. And then I wrote some scripts to can control LIFX bulbs from the command line or from a AWS IoT Button.\n\nThe scripts\n\nThe scripts can toggle, set, and get the current state of a single light, all lights, or a group of lights. You can check them out on on GitHub and try them if you have also LIFX bulbs.\n\nToggle a light\n\nIf I want to toggle a light, group of lights, or all of our lights, I can run:\n\nlifx-toggle --bulb=&lt;bulb ID|all&gt;\n\n\nThe value of bulb is known as a selector in the LIFX API. For example, I can pass through a single bulb ID, the keyword all for all of my lights, or a group ID.\n\nSet a light\n\nIf I want to set a light with a different brightness, color, power, or duration, I can run:\n\nlifx-set --bulb=&lt;bulb ID|all&gt; --color=&lt;string&gt; --power=&lt;on|off&gt; --brightness=&lt;number&gt; --duration=&lt;number&gt;\n\n\nIt’s fun to transition between colors by setting a long duration (which is in seconds).\n\nGet a light\n\nIf I want get the status of a particular light, I can run:\n\nlifx-get --bulb=&lt;bulb ID|all&gt;\n\n\nThis script is also handy for finding out the selectors for all your lights.\n\nHooking up the IoT button\n\nI have an additional script in the repo that my IoT button runs or I can run from the command line:\n\nlifx --bulb=&lt;bulb ID|all&gt; --click=&lt;SINGLE|DOUBLE|LONG&gt;\n\n\nIn the case of my button, a single click turns my nightstand light on at 30% brightness. When I double click it turns the entire bedroom to 50% and when I long press it turns on all the lights in the house. I created iot-settings.json to configure these settings and then set the actual bulb IDs as parameters in my Cloudformation template.\n\nTo get my button set up, I followed the AWS IoT Button AWS CloudFormation Quickstart guide to learn how to create a CloudFormation template that works with the IoT button. I customized their template so that I could invoke my  function.\n\nI deployed my code, created a new stack and had my button up and running. The only issue I’ve found with the AWS IoT Button is that there is a few second delay from when I press the button and LIFX processes the request. Otherwise, I had a great time playing with both the IoT button and the LIFX API.\n",
  tags: ["API","mom stuff"],
  id: 4
});
index.add({
  title: "2017 Summer",
  category: "playlists",
  content: "Listen on Spotify\n\n\n  Bassically, Tei Shi\n  4:00 AM, Sorcha Richardson\n  Please, Rhye\n  The Wheel, SOHN\n  Slop, Forth Wanderers\n  Asido, Purity Ring\n  Atalanta, Rina Mushonga\n  Unfold, Forth Wanderers\n  PS2, Litany\n  The Depths, Cross Record\n  Se16 (feat. Flohio), God Colony, Flohio\n\n",
  tags: [],
  id: 5
});
index.add({
  title: "2017 Spring",
  category: "playlists",
  content: "Listen on Spotify\n\n\n  Kitty Kat, Empress Of\n  Visions of Old, Kelsey Lu\n  Chemicals, Rosemary Fairweather\n  How Far, Tei Shi\n  For Light, Jay Som\n  Getting It On, Sales\n  Diamonds, Girl, El May\n  All Mine, Ivy Sole\n  Dim The Lights, Wild Ones\n  Kicks, FKA twigs\n  Houdini Crush, Buke &amp; Gase\n  No Lie, Wet\n  Send Me Out (Girl Unit Mix), Kelela\n  Being No One, Going Nowhere, STRFKR\n  Guts, Tall Friend\n  I’m Fine, Hazel English\n  You’ve Got Me, Alex Napping\n  Freedom Ring, Celebration\n  Shine a Light, Shabazz Palaces, Quazarz, Thaddillac\n  Headache, Grouper\n  Cut Your Bangs, Girlpool\n  Objects, Big Thief\n  Bassically, Tei Shi\n\n",
  tags: [],
  id: 6
});
index.add({
  title: "Building a ChillBot",
  category: "code",
  content: "I wrote Keep your streak in the work week on The Human In The Machine today. My article is about how I built ChillBot, a Slack bot that messages me on the weekends to let me know if I’ve contributed on GitHub for seven consecutive days and to encourage me to take a break.\n\nThe message looks something like this:\n\n\n\nHow it works\n\n\n  Fetch all of my activity on GitHub through the Events API. (The API only retrieves up to 300 events, so if you’re a power user, the API may not retrieve enough data to determine if you have a streak or not.)\n  Get every unique date when I did something on Github.\n  Determine how many days I’ve contributed on GitHub by looping through every day starting with yesterday through my decided streak (7 days). And if that day matches a day that I contributed on GitHub then mark it, if it doesn’t then break the loop.\n  If my streak is greater or equal to the number of days I contributed, ping me on Slack.\n\n\nIronically, it took a little bit to break my streak as I was working on this bot on the weekend, but I am proud of any of my gray-square weekends.\n\nYou can check out the code on GitHub and learn how to automate the bot with Amazon Web Services with the steps I wrote up.\n",
  tags: ["bots"],
  id: 7
});
index.add({
  title: "2016/2017 Winter",
  category: "playlists",
  content: "Listen on Spotify\n\n\n  All, Katie Dey\n  Sutphin Boulevard, Blood Orange\n  Big Sis, Sales\n  Trophies for Paradox, Braids\n  Tea Lights, Lower Dens\n  Feather, Little Dragon\n  Best to You, Blood Orange\n  Low Dogg, Micachu &amp; The Shapes\n  I Don’t Wanna Be Funny Anymore, Lucy Dacus\n  First Love / Late Spring, Mitski\n  Fuck with Someone Else, Gangly\n  When Cameron Was in Egypt’s Land Let My Cameron Go, Wovoka Gentle\n  Plastic 100°C, Sampha\n  Beatcity, Still Corners\n  Fast Moving Cars, Carla dal Forno\n  Time to Go Home, Chastity Belt\n  The Embers, Vagabon\n  Sweet Sound of Ignorance, Soko\n  Sense, Kllo\n  The Embers, Vagabon\n  Undine, Fear of Men\n  Kitty Kat, Empress Of\n\n",
  tags: [],
  id: 8
});
index.add({
  title: "WeatherBot gets alerts",
  category: "code",
  content: "I didn’t expect WeatherBot to become a series of posts, but the weather has been fluctuating so much scary.\n\nWeatherBot has severe weather alerts now:\n\n\n\nHow it works\n\n\n  If there are any alerts in the request, then loop through them.\n  Get the title, start, expiration date, and link to the alert.\n  Evaluate the severity of the alert and assign an emoji (advisory :grey_exclamation:, watch :exclamation:, warning :bangbang:).\n  Post to Slack.\n\n\nI’m looking forward to using this bot as a reminder to open up my laptop and stay inside :grimacing:.\n",
  tags: ["bots"],
  id: 9
});
index.add({
  title: "WeatherBot goes outside",
  category: "code",
  content: "Last week I talked about how I built a WeatherBot that gives us a heads up if there will be snow over the next several hours. The recent warm weather inspired me to add warm weather alerts:\n\n\nCloudy and warm\n\n\nParty cloudy and warm\n\nHow it works\n\n\n  Get the current weather data.\n  If the temperature is between 50℉ and 90℉ and there probably won’t be any precipitation (less than 20% chance), post to Slack.\n  Also, translate the Dark Sky icon in the request to an emoji and use that for the Slack message icon to indicate just how nice it is outside right now. (I modified the original post to Slack script to include a parameter for emoji to help make this fun little feature happen.)\n\n\nI’m looking forward to using this bot as a reminder to close my laptop and go for a walk.\n",
  tags: ["bots"],
  id: 10
});
index.add({
  title: "Building a WeatherBot",
  category: "code",
  content: "We live in Upstate New York so there’s snow and it’s kind of pain for J to plow the driveway if our cars are in the way. I built a little Slack bot that runs three times a day (7 am, 1 pm, and 7 pm). And if there will be more than one inch of snow in the next 12 hours then WeatherBot will ping our Slack:\n\n\n\nHow it works\n\n\n  Using the Dark Sky API, I run through the hourly data for the next 12 hours.\n  During each hour, if there’s precipitation and it’s snow, and there is accumulation then start adding up the accumulation.\n  If there’s more than 1 inch of snow during the next 12 hours, then post to Slack.\n\n\nHow it runs\n\nWeatherBot uses three AWS resources:\n\n\n  S3 - I deploy and host the code here.\n  Cloudformation - I created a Cloudformation template that defines the variables and the functions that Lambda will need to run my code.\n  Lambda - Lambda is responsible for running my code at the days and times I’ve defined. (The Cloudformation template does me a solid by configuring Lambda for me.)\n\n\nBrowse the code!\n\nAnd now we get to sit back and wait for :snowflake: and then park our cars good.\n",
  tags: ["bots"],
  id: 11
});
index.add({
  title: "Grand Canyon",
  category: "adventures",
  content: "To celebrate my birthday (and to mitigate cabin fever), J and I headed to the Grand Canyon.\n\nHoover Dam\n\nWe landed in Las Vegas on Friday, picked up the rental car, and drove about 40 minutes to the Hoover Dam.\n\n\n\n\n\n\n\n\n\n\nLas Vegas\n\nWe drove back to Las Vegas and stayed the night.\n\n\n\n\n\n\nGrand Canyon Village\n\nOn Saturday we packed up and drove the four and half hour to the Grand Canyon Village.\n\nWe stayed at El Tovar, conveniently located right on the South Rim, for three nights. The area experience several back-to-back snowstorms which meant that the conditions were icy and left little chance for hiking (that didn’t involve lots of snow gear). Fortunately, we were able to drive up and down the South Rim and enjoy the views from the many scenic pull-offs and overlooks.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nSunrise at Hopi Point\n\n\n\n\n\n\n\n\nYavapai Point\n\n\n\n\n\n\n\n\n\n\nTaken by my iPhone propped up by my wallet in a snow bank. (Ok, you got us. We weren't really prepared for this trip.)\n\n\nWe spent the last night in Las Vegas on my birthday. Even though we’re not into gambling, we turned a $100 bill from our wedding into $300 on the Roulette table. We blew it all on dinner.\n\n",
  tags: ["yay"],
  id: 12
});
index.add({
  title: "2016 Fall",
  category: "playlists",
  content: "Listen on Spotify\n\n\n  Call Me in the Day, La Luz\n  You’re Out Wasting, Andy Shauf\n  Etiquette, Land Lines\n  Used to Be, Weyes Blood\n  Turn Me Around, Half Waif\n  Heartbeats, The Knife\n  Never Be Like You (feat. Kai), Flume, kai\n  Si un jour, La Femme\n  If You Let It, Thelma\n  The Weather, Twin Limb\n  All, Katie Dey\n  They Said, Wild Ones\n  Glory Glory, And The Kids\n  Yellow Sea, Madame Gandhi\n\n",
  tags: [],
  id: 13
});
index.add({
  title: "Getaway in the Catskills",
  category: "adventures",
  content: "We spent (a very relaxing) two days in a tiny house in the woods. We read books, napped, hiked, made pancakes, and had two campfires.\n\n\n\n\n\n\n\n\n\n\n\n\n\nOverlook Mountain\n\nOn Tuesday, we hiked Overlook Mountain to see the ruins of an old hotel.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nAnd we climbed the fire tower.\n\n\n\n\n\n\nYou can spot the ruins on the bottom-right.\n\n",
  tags: ["hiking","recommended"],
  id: 14
});
index.add({
  title: "How to get married at an Airbnb",
  category: "notes",
  content: "On Saturday, June 18, Jason and I were married at an Airbnb on the side of a mountain near Manchester, Vermont. It ended up being more beautiful than both of us imagined.\n\nHere’s how we did it:\n\n1. Trim your guest list\n\nWe kept our list to parents and siblings only. Keeping the wedding to immediate family was easier to explain to the people closest to us without hurting feelings. Including us, we were a wedding party rolling nine deep.\n\n2. Book the house of your dreams\n\nAfter hitting dead ends with typical wedding venues, we took to Airbnb. I knew as soon as I clicked the listing that this was it. I showed Jason and he quickly replied: Yes.\n\nHere are some features to look for when choosing your Airbnb venue:\n\n\n  a bedroom for everyone\n  a large dining table\n  space for a ceremony outside (and inside in case of rain)\n  flexible check-in and out times\n  space for the everyone to get ready\n  fun amenities (hot tub, sauna, hiking trails)\n\n\n\n\n\n\n\n3. Tell your hosts you’re getting married\n\nWe were up front with our hosts about our intentions, and they were supportive all along the way.\n\n\n\n4. Book vendors early and always choose tacos\n\nWe found that traditional wedding caterers had a minimum fee for their services which didn’t scale well with our small wedding. We ended up going with a local restaurant, Gringo Jack’s, who brought us a fantastic taco bar. We found our officiant on Wedding Wire, the photographer from browsing Instagram, and the cake bakery, hair stylists, and florist were also local to the area.\n\n\n\n\n\n\n\n(I custom ordered the bibs on Etsy! The y ended up being really cute and made everyone laugh.)\n\n5. Plan out all meals\n\nSince we were all there for the weekend, each family ended up covering a meal which worked well. I think the hardest part was that we had so many leftovers to divvy up on Sunday.\n\n6. Have a back-up plan\n\nFor a small fee, we paid for wedding insurance just in case our venue fell through. We also searched Airbnb for similar houses in the area just in case. Thankfully we didn’t end up needing any backups.\n\n7. Create a to do list and schedule\n\nWe created a list of everything that needed to happen on Friday and Saturday, including when the vendors would arrive and their names. This allowed us to relax on the day and let our family grab a task when they could.\n\n8. Make a playlist\n\nWe created a rdio Spotify playlist with our ceremony songs first and then the more upbeat lovey dovey songs for the rest of the night. The Airbnb had an amazing sound system throughout the house (even the bathrooms). Jason hit play right before he walked out.\n\n9. Assemble a wedding arch\n\nWe wanted a wedding arch to frame our ceremony space and make it feel more intimate. We also needed something that was easy to break down and assemble. We ended up buying ¾” black pipe from the hardware store and used stakes to keep it sturdy. The florist hung flowers to pull it all together.\n\n\n\n\n\n10. Bring place settings\n\nWe weren’t sure what the Airbnb would have stocked in the kitchen, so we picked up pretty paper and utensil supplies, fancy napkins, and recyclable champagne flutes.\n\n\n\n\n\n\n\nOk, I bought a ton of other stuff, too:\n\n\n  Ensidig vases from Ikea\n  Glasig tealight holders from Ikea\n  White candlesticks and tealights from Target\n  Marble tile (that I turned into coasters by sanding them down and adding felt backing)\n  Wood blocks from the craft store that Jason drilled holes to fit candlesticks\n  Copper mugs, pitcher, bar spoon, and jigger\n\n\n\n\n\n\nIt was a really good day.\n",
  tags: ["yay","lists"],
  id: 15
});
index.add({
  title: "Becoming an Outdoors-Woman 2016",
  category: "adventures",
  content: "My mom and I attended the Becoming an Outdoors-Woman workshop again, this year at Greek Peak outside of Cortland, New York.\n\nI took:\n\n\n  Trail cameras\n  Archery\n  Taxidermy\n  Tree identification\n\n\nTrail cameras\n\nWe learned techniques for setting up trail cameras and attracting animals. Most people use trail cameras for hunting, but my goal is to see what’s running around in my backyard.\n\nArchery\n\nWe learned the parts of the bow and how to shoot. We practiced shooting with a recurve and a compound bow. We shot at a traditional target, a balloon on a target, 3D targets (animal decoys), milk jugs on the ground, and helium balloons.\n\nHitting any target was such a rush. I didn’t expect to enjoy archery as much as I did! And not going to lie, I have a compound bow sitting in my Amazon cart right now.\n\n\n\n\n\nTaxidermy\n\nI was most excited about taking taxidermy since I didn’t get into the class last year. The class lived up to its hype. At the start of class we all got to choose a (frozen) specimen: a chipmunk or a rat. Our instructor guided us through the entire process of taxidermy. It was hard work and required precision and attention to detail. I found it to be very rewarding, even though I had to giggle through some of the gross parts.\n\n\n\n\n\nI’ll take his pins out and remove the tape from his ears in a couple of weeks when he’s done setting (and you know I’ll be posting adorable pics of him at his little desk on Instagram).\n\nTree identification\n\nWe learned how to use tree identification keys by first examining and observing branches. Then we headed into the woods and kept on identifying. I’m looking forward to going through my backyard and taking stock!\n\n\n\n\n\nRecommended book: Trees of the Eastern and Central United States and Canada\n\nIt was great to learn new skills this weekend that didn’t involve a screen.\n",
  tags: ["yay","family"],
  id: 16
});
index.add({
  title: "2016 Summer",
  category: "playlists",
  content: "Listen on Spotify\n\n\n  Special Affair, The Internet\n  With Me, dvsn\n  Cherry Tree, Xenia Rubinos\n  Lazy Jane, Jenny O.\n  Devil Like Me, Rainbow Kitten Surprise\n  River, Akron/Family\n  #88, Lo-Fang\n  Play, Iamamiwhoami\n  Skylark Interabang?!, Made in Heights\n  Top of the Hill, Conduits\n  Same Mistakes, The Echo-Friendly\n  Deeper Than Love, Colleen Green\n  Ain’t It So, PAPA\n  In the Moonlight, Blithe Field\n  Tame One, Your Friend\n  Slippin, Quadron\n  Blossom, Black Atlass\n  Do It For Me, Sweater Beats, Erin Marshall\n  You’re Out Wasting, Andy Shauf\n  Shut Up Kiss Me, Angel Olsen\n  You Can, Tearjerker\n  Beginning to Blue, Still Corners\n  Animal, The Acid\n  Trophies for Paradox, Braids\n  Probably Nu It, Tree\n  Call Me in the Day, La Luz\n\n",
  tags: [],
  id: 17
});
index.add({
  title: "Organizing a conference with bots",
  category: "notes",
  content: "Last year, Ela Conf organizers and I relied on Google Forms for women to submit anything from talks to volunteer applications. Forms worked well for us, but reviewing abstracts in a spreadsheet wasn’t exactly a fun thing to do. With the help of Zapier, I created some efficient little bots that keep us organized and motivated.\n\nVolunteer, proposals, and grant bot\n\nEvery time someone submits a volunteer application or an abstract, a new GitHub issue is created in our private repo and then our organizer Slack channel receives a ping:\n\n\n\n\n\n:raising_hand: Under the hood: First, I created a GitHub account @elaconfbot (so as to not inflate my GitHub graph, make it clear that I’m not creating new issues, and because bots are cute). I made a zap in Zapier that will submit a new GitHub issue by @elaconfbot once a new row in the form’s spreadsheet is added (aka someone fills out the form). We also have a Slack integration that watches the repo for new issues.\n\nWith Zapier, you can also assign labels and even add issues to milestones as someone submits a form. Now instead of reading a spreadsheet, we’ll be able to comment on each abstract and use all of GitHub’s organizational features. I absolutely adore this workflow.\n\nWe have this workflow set up for all of our forms:\n\n\n\nWelcomebot\n\nEvery time a someone requests to join our Slack channel, we get pinged in our organizer channel:\n\n\n\n:wave: Under the hood: Zapier listens for additions to the spreadsheet and sends a message to our Slack channel. We can now add women to our community even faster!\n\n\n\nTicketbot\n\nEvery time someone buys a ticket, we get pinged in our organizer channel:\n\n\n\n:ok_woman: Under the hood: I created a catch hook in Zapier and entered it in nvite’s RSVP webhook setting (thanks for being a sponsor, nvite!) as the trigger. I think this is our favorite bot!\n\n\n\nBots, bots, and more bots\n\nEvery time we get a ping from our :raising_hand: :wave: :ok_woman: bots, we all get excited. Seeing women wanting to participate with and at Ela Conf in real-time is much more magical and meaningful than I think we all anticipated.\n\nIt’s also going to be fun watching @elaconfbot’s contribution graph:\n\n\n\nCan you tell when we opened our call for proposals?\n\nMy next challenge will be building an anonymous feedback system for our speakers. I have a suspicion that it will involve some type of form, GitHub, and then some type of delivery service. I cannot wait to get started!\n\nIf you enjoyed this post, love bots, awesome systems, and advancing women in tech, please consider becoming an Ela Conf sponsor!\n\n",
  tags: ["Ela Conf","bots"],
  id: 18
});
index.add({
  title: "2016 Spring",
  category: "playlists",
  content: "Listen on Spotify\n\n\n  Cavity, Hundred Waters\n  Never Be Like You (feat. Kai), Flume Kai\n  Smalltalk - Four Tet Remix, Ultraísta Four Tet\n  Funn, Cash+David\n  River, The Belle Game\n  Float (feat. Kenzie May), FTSE Kenzie May\n  I Heard, Young Fathers\n  Blacks, Dawn Golden Rosy Cross\n  Brokeup, Arca\n  Rhythm of Devotion, Sisyphus\n  Advanced Falconry, Mutual Benefit\n  With Me, dvsn\n  Flatlands, Chelsea Wolfe\n  No Below, Speedy Ortiz\n  ‘Cause I’m A Man - HAIM Remix, Tame Impala\n  Special Affair, The Internet\n  Pulsing, Tomas Barfod Nina K\n  I Am the Antichrist to You, Kishi Bashi\n  Strange - Single Version, Patsy Cline\n\n",
  tags: [],
  id: 19
});
index.add({
  title: "What I learned after working remotely for 2 years",
  category: "notes",
  content: "I have entered my terrible terrific twos of working remotely. Working from yoga pants. Working from couch. Working from over the sink as I eat leftovers. The glamour. The rolling out of bed. The “I’m going to wake up early and walk, lol jk.”\n\nLast year, I talked about lessons learned and this year I’d like to focus on communication. Here’s how I’ve made working miles away from my team feel like inches:\n\n\n  Emote. :wave: :clap: :sparkling_heart: :sparkles: :+1: :tada:\n  Avoid sarcasm. Sarcasm pros: I am funny. Sarcasm cons: I’m making a situation unproductive, draining a person’s emotional resources, and potentially adding bricks to a wall that rests between my team and me.\n  Always be updating. It’s like the most dangerous game except I’m hunting me. Can I keep my tickets and pull requests updated before someone asks me for an update or asks what the next actions are?\n  Know thine words. I started using Grammarly, the saver of butts, to gut and spell check my prose. Grammarly reminds me to avoid it and this aka clear writing foes.\n  Use these phrases more: How are you? What are you doing this weekend? Thank you! You are welcome. I’m sorry, I made a mistake. What can I take off your plate? I need help. Great job!\n\n\n\n\n\n",
  tags: ["life","lists"],
  id: 20
});
index.add({
  title: "The farm",
  category: "adventures",
  content: "My Mapbox squad threw me a bachelorette party in the woods. We relaxed, hiked, ate, drank, and danced.\n\n\n\n\n\nAnd we saw a zebra and zedonk along the way.\n\nThe farm\n\nMorning walk around the pond.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nRed Oak Mountain\n\nThe view from our hike.\n\n\n\n\n\n\n\n\n\n    💁🏻🙆🏻👰🏼🙌🏻🤗🤔 #katysladies A photo posted by Tatiana Van Campenhout (@zatiana) on May 29, 2016 at 10:34am PDT\n\n\n\nBest. Weekend. Ever.\n\n\n\n\n\n",
  tags: ["yay","friends","Mapbox"],
  id: 21
});
index.add({
  title: "Unconventional use cases for Jekyll",
  category: "code",
  content: "Yesterday, I had the pleasure of speaking at JekyllConf. My talk, Unconventional use cases for Jekyll, is a love story about Jekyll, and ok, some of the experiments and projects I’ve made with it.\n\n(Spoiler alert: I’ll show you how to loop the crap outta your data.)\n\n\n  My slides\n  Code for my slides and all my demos\n  JekyllConf speakers map made with Mapbox GL JS\n  Video of my talk\n\n\nThank you CloudCannon for organizing a great event!\n",
  tags: ["Jekyll","conference","yay"],
  id: 22
});
index.add({
  title: "2015/2016 Winter",
  category: "playlists",
  content: "Listen on Spotify\n\n\n  Nightcall, Kavinsky + Lovefoxxx\n  Fitzpleasure, alt-J\n  Ch-Ching, Chairlift\n  Easy Easy, King Krule\n  Levitation, Beach House\n  Dopamine, DIIV\n  The Night Air, Shady Elders\n  Twice, Little Dragon\n  Into the Black, Chromatics\n  Never Be Like You (feat. Kai), Flume + Kai\n  Gosh, Jamie xx\n  We Were Meant to Be Together, Tom Brosseau\n  Cavity, Hundred Waters\n\n",
  tags: [],
  id: 23
});
index.add({
  title: "Plotters Kill Preserve",
  category: "adventures",
  content: "\n \n\n\n\nWe hiked around Plotters Kill Preserve](http://www.alltrails.com/trail/us/new-york/plotter-kill-preserve) by starting on the blue trail. The blue trail is nice, but has limited views of the falls. We hopped on the red trail for a bit and were able to get a better view.\n",
  tags: ["hiking","recommended"],
  id: 24
});
index.add({
  title: "X-Files for every occasion",
  category: "notes",
  content: "I love the X-Files and to celebrate the new season I created a list of episodes that I think about often.\n\nEvery time I fly — Tempus Fugit and Max\n\nWhen boarding a flight, attendants rattle off credit card and loyalty programs giving members an opportunity to board first. They usually have corny names like Sky Priority Boarding Zone and for some reason all I can think about is:\n\n\n\nSo much leg room!\n\nEvery time I get my nails done — Irresistible and Orison\n\nDonnie Pfaster is a serial killer who fetishizes over women with red nail polish and prefers natural redheads (re: Scully). He’s the ultimate creep (and literally a demon), I mean look:\n\n\n\nEvery time I have a ringing in my ear — Drive\n\nBryan Cranston’s character must drive west to keep the pressure in his ear from exploding his head. Gruesome? Sure. But Bryan Cranston makes this episode one of my favorites.\n\n\n\nEvery time I get mansplained — Never Again\n\nThis Scully-tastic episode includes her meeting a new guy, but he has some issues (he thinks that his tattoo is compelling him to kill and stuff). This is one of the first episodes that focuses solely on Scully and emphasizes her much needed break from Mulder. At the end of the episode an exhausted Scully remarks to Mulder:\n\n\n\nTell em.\n\nEvery time I see an LED screen — Blood\n\nIn this episode, electronics compel people to kill via short messages on screens. So now I’m a little suspicious of my Fitbit’s words of encouragement after it told me to “BURN IT.”\n\n\n\nEvery time I hear “Wonderful! Wonderful!” — Home\n\nA creepy inbred family1 murders to keep family inbred (to the crooning of Johnny Mathis). I also think about this episode when I’m hangry, but you’ll have to watch the episode to understand this (creepy) reference.\n\n\n\nEvery time I think I’m going to enjoy a bath — The Host\n\nMulder and Scully track down a flatworm monster that slithers through drains and attacks. Since this is one of the scariest monsters, I pixelated its flatworm face1.\n\n\n\n:alien:\n\n\n  \n    \n      Watch with the lights on.&nbsp;&#8617;&nbsp;&#8617;2\n    \n  \n\n",
  tags: ["The truth is out there","Trust no one"],
  id: 25
});
index.add({
  title: "Bozen Kill Preserve",
  category: "adventures",
  content: "Today we hiked Bozen Kill Preserve in Altamont. It was muddy, icy, and even muddy-icy combo, but it’s a lovely trail.\n\nI recommend starting with the blue trail as it takes you along the stream where there are small falls, and then it meets up with the white trail.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nWe look forward to returning to the preserve in the spring!\n",
  tags: ["hiking","recommended"],
  id: 26
});
index.add({
  title: "2015 Fall",
  category: "playlists",
  content: "Listen on Rdio\n\nListen on Spotify\n\n\n  This Is The Last Time, The National\n  Balance, Future Islands\n  Necessary Evil, Unknown Mortal Orchestra\n  100/0 (Snowdays forever), A Sunny Day In Glasgow\n  Strange Mercy, St. Vincent\n  Two Weeks, FKA twigs\n  desert rose (war prayer), Inc.\n  Secret Meeting, The National\n  Just from Chevron, Dirty Projectors\n  Borders, M.I.A.\n  How Near, How Far, …And You Will Know Us By The Trail Of Dead\n  Mire (Grant’s Song), Diiv\n  Now, Now, St. Vincent\n  Shampoo Suicide, Broken Social Scene\n\n",
  tags: [],
  id: 27
});
index.add({
  title: "ELA Conf",
  category: "notes",
  content: "Earlier this year, Joni Trythall retweeted something about a new tech conference, ELA Conf, to empower women to pursue leadership roles. There was just something (re: :sparkles:) about the conference that got me excited, and suddenly I found myself emailing the conference (not even realizing that Joni was on the other end):\n\n\n\n\n\nOn May 7, I became on co-organizer of ELA Conf alongside Joni,  LeeAnn, and Dominique.\n\nWe spent the next several months connecting every other week on Google Hangouts and soon every day on Slack. We researched, planned, tweeted, emailed, networked, emoji’d, and stayed up late. Soon the website had ticket sales, a call for proposals, speakers, sponsors, a venue, and at long last, an agenda!\n\nOver the weekend, we had the conference and it was a huge success. Our attendees were excited and eager to learn, and our speakers were fearless and eager to share their stories.\n\n\n\n\n\n\n\n\nPhotos by Nhu Nguyen.\n\nSeveral attendees wrote about their own experiences at ELA Conf, and I really think you should read them:\n\n\n  Where are the women in tech? Right here. And they’re organized and taking over.\n  The Sisterhood of the ELA Conf\n  Getting Started Speaking Workshop at ELA Conf\n  My Love Letter to ELA Conf\n  How these 3 women found their place in the tech scene\n  The ELA Conf\n  My first non-tech talk at ElaConf\n  A Look Back on ELA Conf\n\n\nBy the end of the conference, we had a community. To keep it going, we opened our ELA Conf Slack where we have channels for jobs, mentorships, talk proposals, community, and more. A place where we can talk about what’s ahead, but also what’s going on with our lives.\n\nA part of me hopes that we’re actually making it harder for these women to think about leaving tech or even executing on it. After all, your friends are all here at ELA Conf, we’re listening, and we want you to succeed.\n\nELA Conf is one of the things that I’m most proud and honored to have worked on, and I can’t believe that I got to be a part of it just from sending one little email.\n\n:purple_heart: :sparkles: :raising_hand:\n\n",
  tags: ["yay","conference","Ela Conf"],
  id: 28
});
index.add({
  title: "Symlinking Jekyll data files",
  category: "code",
  content: "Font Library has delicious data packed into a JSON file. I’ve had an urge to see how else I can hack the file with Jekyll and tonight I was up for the challenge.\n\nTo start, the JSON file is in the root of the Jekyll site, making it a simple file without Jekyll powers. I keep it there so it’s easier to find, especially for contributors. A few times I had considered moving it to _data/ because with a Jekyll data file I can use liquid to loop and if and else the data all I want.\n\nI also thought about duplicating the file so that I’d have the best of both worlds, but that’s hard to maintain. And then I thought about creating a symlink. I had never created one before, but thanks to the Internet I opened Terminal and entered:\n\n$ ln -s ../families.json _data/families.json\n\nAnd :boom: symlink! (Ok, it wasn’t that smooth. It took me a bit to figure out how to write the path. And then after I pushed, I got a build error because I originally didn’t use a relative path.)\n\nBut will it loop?\n\nI created a file in the root families.csv and wrote:\n\n------{% for item in site.data.families %}{{item.family}}{% endfor %}\n\n\nAnd soon I had a CSV file with a list of the font family names.\n\nI also used “very ugly string manipulation hacks” to get a distinct list of tags and in alphabetical order. And with a few more very ugly string manipulation hacks, I got the CSV file looking exactly how I wanted:\n\n\n\n\n\nSince Github pages run in safe mode the file won’t build in production. (It’s still totally a success though.)\n\n",
  tags: ["Jekyll"],
  id: 29
});
index.add({
  title: "VT to NH to ME",
  category: "adventures",
  content: "We took a three-night drive through New England with help from Hotel Tonight.\n\nBurlington, VT\n\n\n\n\n\nJeffersonville, VT\n\n\n\n\n\nBingham Falls, VT\n\n\n\n\n\n\n\n\n\nMoss Glen Falls, VT\n\n\n\n\n\n\nMount Washington, NH\n\n\n\n\n\n\n\n\n\n\n\nCape Elizabeth, ME\n\n\n\n\n\nKennebunkport, ME\n\n\n\n\n",
  tags: ["road trip","yay"],
  id: 30
});
index.add({
  title: "Becoming an Outdoors-Woman",
  category: "adventures",
  content: "This weekend my mom and I had the pleasure of attending the Becoming an Outdoors-Woman workshop at Silver Bay. BOW is an international program that focuses on educating and helping women become self-sufficient through outdoors-related skills. It’s a beautiful program with experienced instructors (who donate their time), enthusiastic volunteers, and amazing women from across the country.\n\nI took:\n\n\n  Basic fishing skills\n  Wild edibles\n  Beginning shotgun\n  Outdoor survival\n\n\nBasic fishing skills\n\nWe learned how the rod works, tying neat and tight knots, setting up a Texas rig, basic fish handling, and how to cast.\n\n\n \n\n\n(I ended up winning a wishing pole at the Friday night raffle :fishing_pole_and_fish: so excited to hit the water next!)\n\nWild edibles\n\nWe discussed foraging etiquette (always take less than ⅓), the best way to become experienced with wild edibles (track a single plant for a year), and we collected some seasonal plants. We made a sumac and raspberry leaf sun tea (really delicious!) and a soup (dandelion leaves, clover, pepper weed, Queens Anne’s lace, carrot, onion, celery).\n\n\n   \n\n\nBeginning shotgun\n\nWe learned proper firearm safety, handling, and shooting. Our instructors went above and beyond by giving us advice to tweak our technique to make sure we hit targets.\n\n\n \n\n\n(I definitely missed more targets than I hit.)\n\nOutdoor survival\n\nWe discussed the importance of being prepared before you hit the trail, we put together a survival pack, and then each of us lit a small fire with a striker and flint (and the cotton ball soaked in petroleum jelly helped).\n\n\n \n\n\nWe cannot wait to go back next year!\n",
  tags: ["hiking","yay","family"],
  id: 31
});
index.add({
  title: "2015 Summer",
  category: "playlists",
  content: "Listen on Rdio\n\n\n  Rosie, Lower Dens\n  Feels Like We Only Go Backwards, Tame Impala\n  Master Of None, Beach House\n  Pure Pain, Kurt Vile\n  Goldtone, Kurt Vile\n  Stars, Angel Olsen\n  Belong to the World, Oddisee\n  Talos Corpse, Cosmicide\n  Forgiven/Forgotten, Angel Olsen\n  World War Pt. 2, Autre Ne Veut\n  You Carry The Deed, Deradoorian\n  Sparks, Beach House\n  Lover’s Spit, Broken Social Scene\n  Magic Chords, Sharon Van Etten\n  Moment Is Dead, Social Studies\n  Shame, Bad Bad Hats\n  Pair Of Wings, Frankie Rose\n\n",
  tags: [],
  id: 32
});
index.add({
  title: "Adirondack Balloon Festival 2015",
  category: "adventures",
  content: "Yesterday morning mom and I woke up at 4:45 to catch the morning launch.\n\n\n\n\n\n\n\n\n\n   \n\n\n\n\n\n \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  tags: ["family","ADK Balloon Festival"],
  id: 33
});
index.add({
  title: "South Yokun Ridge",
  category: "adventures",
  content: "Today we visited Olivia’s Overlook and then hiked the South Yokun Ridge in Stockbridge, Massachusetts.\n\n\n\n\n\n",
  tags: ["hiking","recommended"],
  id: 34
});
index.add({
  title: "Kings Highway Barrens",
  category: "adventures",
  content: "We crossed trail #9 of the Albany Pine Bush Preserve off the list :ok_hand:.\n\n\n\n\n\n\n\n\n\n",
  tags: ["hiking","time travel","recommended"],
  id: 35
});
index.add({
  title: "lunr.js and Jekyll",
  category: "code",
  content: "I recently spent some time hooking up a Jekyll site with lunr.js. Lunr.js is a full text client-side search engine and it works rather well. It took me a few tries to understand how lunr works and then translate that into a Jekyll site (I had some help from this post) so here’s a walkthrough of I how got it all connected.\n\nI also built a live demo with my site: http://katydecorah.com/search\n\nTell lunr all about your fields\n\nI started off by creating a file called, lunr-feed.js and adding front matter since I’ll be using logic to loop through my posts.\n\nNext, I declared fields to describe my data (and by data I mean my posts). I can customize the field names, but it’s important to keep the id field (this acts like an unique identifier). I can also add a boost to each field. A boost tells lunr that I want it to favor this field that much more in the context of searching. In my case, I wanted lunr to focus on the content of my posts, so I applied a boost to that field.\n\nvar index = lunr(function () {  this.field('title')  this.field('content', {boost: 10})  this.field('category')  this.field('tags')  this.ref('id')});\n\nNow give lunr your data\n\nNext, I gave lunr my data. This is the data that I want lunr to search and it corresponds with the fields that I defined above. And to keep my data straight, I increment a count to build the id as my unique identifier for each post.\n\n{% assign count = 0 %}{% for post in site.posts %}index.add({  title: {{post.title | jsonify}},  content: {{post.content | strip_html | jsonify}},  category: {{post.category | jsonify}},  tags: {{post.tags | jsonify}},  id: {{count}}});{% assign count = count | plus: 1 %}{% endfor %}\n\nBy adding my fields and data, lunr passes it through its pipeline, processes the data, and builds an object that I’ll query later.\n\nBuild a data reference for lunr\n\nTo complement the data that I gave to lunr, I created an object that contains basic information about each post. This is so I can reference it against lunr’s search results because lunr returns the reference id as a search result and not all the data I gave it.\n\nvar store = [{% for post in site.posts %}{  'title': {{post.title | jsonify}},  'link': {{ post.url | jsonify }},  'image': {{ post.image | jsonify }},  'date': {{ post.date | date: '%B %-d, %Y' | jsonify }},  'category': {{ post.category | jsonify }},  'excerpt': {{ post.content | strip_html | truncatewords: 20 | jsonify }} }{% unless forloop.last %},{% endunless %}{% endfor %}]\n\nQuery lunr and the match results\n\nFinally, it’s time to query lunr aka query that index object lunr created from my fields and data. Lunr returns id numbers as search results (in order of most relevant) and then I use that id as an index number for my store object so I can output details about each search result.\n\n$(document).ready(function() {  $('input#search').on('keyup', function () {    var resultdiv = $('#results');    // Get query    var query = $(this).val();    // Search for it    var result = index.search(query);    // Show results    resultdiv.empty();    for (var item in result) {      var ref = result[item].ref;      var searchitem = '&lt;div class=\"result\"&gt;&lt;a href=\"'+store[ref].link+'\" class=\"post-title\"&gt;'+store[ref].title+'&lt;/a&gt; &lt;div class=\"post-date small\"&gt;'+store[ref].category+' &amp;times; '+store[ref].date+'&lt;div&gt;&lt;p&gt;'+store[ref].excerpt+'&lt;/p&gt;&lt;/div&gt;';      resultdiv.append(searchitem);    }  });});\n\nNow search\n\nAnd that’s how I brought lunr.js to Jekyll. You can add some fun stuff, like the number of search results or even play around with lunr’s options to really customize the search.\n\n\n  Documentation: lunr.js\n  Demo: http://katydecorah.com/search\n  Code: lunr-feed.js\n  Live file: lunr-feed.js\n\n",
  tags: ["Jekyll","lunr.js"],
  id: 36
});
index.add({
  title: "Normanskill Farm Bridge",
  category: "adventures",
  content: "We visited the Normanskill Farm Bridge, also known as the Whipple Cast and Wrought Iron Bowstring Truss Bridge and took the yellow brick road.\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  tags: ["time travel"],
  id: 37
});
index.add({
  title: "Round Lake Preserve",
  category: "adventures",
  content: "\n\n\n\n\n\n",
  tags: ["time travel"],
  id: 38
});
index.add({
  title: "2015 Spring",
  category: "playlists",
  content: "Listen on Rdio\n\n\n  Time to Go Home, Chastity Belt\n  IDC, Chastity Belt\n  Everything New, No Joy\n  Pirates Cove, Coasting\n  Trust Me, Blouse\n  Blue Bucket of Gold, Sufjan Stevens\n  Blockbuster Night Part 1, Run The Jewels\n  Hare Tarot Lies, No Joy\n  Ghost Boy, Widowspeak\n  Starts and Stays, Coasting\n  Speak In Rounds, Grizzly Bear\n  Fuck Her Tears, Times New Viking\n  Rosie, Lower Dens\n  Shadows, Yo La Tengo\n  The Trip, Still Corners\n  Walking With Thee, Clinic\n  Two Drummers Disappear, Thee Oh Sees\n  I Get Nervous, Lower Dens\n  Interference Fits, Perfect Pussy\n  Foreground, Grizzly Bear\n  Potholderz feat. Count Bass D, MF DOOM\n  In the New Year, The Walkmen\n  Nightlife, Phantogram\n  Shriek, Wye Oak\n  Tea Leaf Dancers, Flying Lotus\n  Baby’s Arms, Kurt Vile\n  Electric, Teen\n  Turning Into Stone, Phantogram\n  Loud Places (feat. Romy), Jamie xx\n  Dreamy Bruises, Sylvan Esso\n  Excuse Me, A$AP Rocky\n\n",
  tags: [],
  id: 39
});
index.add({
  title: "What I learned after working remote for 1 year",
  category: "notes",
  content: "\n  Shower and change your clothes frequently (or daily even)\n  Your significant other (who also works from home) isn’t your coworker — respect their time.\n  Leave the house (even if it’s to aimlessly walk around Jo-Ann Fabrics).\n  Don’t do house chores during work hours (because you’ll never remember to fold the laundry).\n  Don’t do work hours during downtime (because you’ll never stop working).\n  Have a special lunch at least once a week (order out, grill a hotdog).\n  Hang out with your friends.\n  Ping your coworkers just to say, Hey!\n  Build a tabletop for the treadmill and walk 5 miles every morning1:\n\n\n\n\n\n\n\n\n  \n    \n      This is how I survived winter.&nbsp;&#8617;\n    \n  \n\n",
  tags: ["life","lists"],
  id: 40
});
index.add({
  title: "Schodack Island State Park",
  category: "adventures",
  content: "\n\n\n\n\n\n\n\n",
  tags: ["hiking","time travel"],
  id: 41
});
index.add({
  title: "Iceland",
  category: "adventures",
  content: "We spent 10 amazing days in Iceland, here’s our journey.\n\nReykjavík\n\nWe kicked it off in Reykjavík and walked all around the city.\n\n\n\n\n\n\n\n\nto Siglufjörður\n\nWe rented a car and took Route 1 up to Siglufjörður, about a 5 hour drive from Reykjavík. Naturally, we stopped along the way. To get to Siglufjörður we had to go through several tunnels. One of which was a single lane tunnel that had intermittent pull-offs (a real nail-biter).\n\n\n\n\n\n\n\n\nSiglufjörður\n\nThis small town was known for its herring industry in the mid-century. It’s just an hour outside of Akureyri (Iceland’s second largest city).\n\n\n\n\n\n\n\nOn our last day in Siglufjörður, we had lunch at Kaffi Rauðka\n\n\n\n\n\nand visited the museums.\n\n\n\n\n\n\n\nAkureyri\n\nWhile still up north, we did a day trip to Akureyri where we visited the Botanical garden, Goðafoss, and then had sushi pizza at Rub23 (seriously).\n\n\n\n\n\n\nAnd here’s the waterfall of the gods, Goðafoss.\n\n\n\n\n\nto Bláskógabyggð\n\nAfter our time up north, we headed back down Route 1 towards the Golden Circle.\n\n\n\n\n\n\nBláskógabyggð\n\nFor one night, we stayed in this charming cottage.\n\n\n\n\n\n\nWhile in the area we visited Geysir\n\n\n\n\n\n\n\n\nand Gullfoss.\n\n\n\n\n\nto Hvolsvöllur\n\nNext we headed down to Hvolsvöllur. On the way we hit a few sites starting with Vatnsleyfoss.\n\n\n\n\n\n\n\nAnd then Kerið, a volcanic crater.\n\n\n\n\n\n\nThen we visited two more waterfalls that were amazing and surprisingly vacant. Here’s Þorsteinslundur.\n\n\n\n\n\n\nAnd our favorite, Gluggafoss.\n\n\n\n\n\n\n\n\n\nHvolsvöllur\n\nHvolsvöllur is a small town in a great location for visiting Vík (black sand beaches), more waterfalls, and taking the ferry to Vestmannaeyjar (Westman Islands).\n\nOn our first day in the area, we drove to Vík (about an hour east) and stopped at sites on the way back.\n\n\n\n\n\n\n\nWe walked on Reynisfjara beach.\n\n\n\n\n\n\n\n\nAnd then the cliffs at Dyrhólaey.\n\n\n\n\n\nWe climbed the steep steps to see eye-to-eye with Skógafoss.\n\n\n\n\n\n\n\nWe also spotted these small (uninhabited) houses lodged in these rocks.\n\n\n\n\n\nAnd then we ended the day at Seljalandsfoss. This waterfall had it all: a persistent rainbow and a walkway behind the falls.\n\n\n\n\n\n\n\nVestmannaeyjar\n\nOn our second to last full day, we took the ferry to Vestmannaeyjar. We visited museums (pet a real live puffin!) and hiked up Eldfell, an active volcano.\n\n\n\n\n\n\n\n\n\n\n\nBlue Lagoon\n\nOn our last full day we visited the Blue Lagoon, the amusement park of geothermal pools.\n\n\n\n\n\n\n\nFor next time\n\n\n  Pack a winter jacket with a hood.\n  Pack an eye mask for sleep. (Surprisingly only one place that we stayed at had black out curtains and the nighttime felt like daytime.)\n  Pack two less shirts.\n  Stay in Reykjavík and take the Flybus upon arrival and the last night. (It’s not worth staying in a hotel near the airport. The Flybus runs regularly and reliably between the airport and Reykjavík.)\n\n\n:heart:\n",
  tags: ["yay"],
  id: 42
});
index.add({
  title: "yay.md",
  category: "notes",
  content: "I keep a gist named yay.md. A secret, never shared and don’t plan to, gist. It’s where I keep screenshots of my personal yays.\n\nA personal yay may be:\n\n\n  When someone I admire appreciates a project that I made or worked on via Twitter, blog post, etc.1\n  When I was nervous or feared I did poorly, but others confirmed that I did well.\n  When someone tells me something positive about myself that I needed to hear.\n\n\nI look at yay.md when I feel nay.\n\nA personal nay may be:\n\n\n  When I’m struggling to understand something.\n  When I feel inadequate.\n  When I want to do everything all the time and all at once.2\n\n\nUnlike yays, I don’t collect the nays. I find that collecting nays gives me a reason to look back when I should be looking forward. And I keep them secret because they’re for me and I can add to my yay trove without fear or consequence of being a yay hog.\n\nI highly recommend curating your own yays because looking at mine reminds me to give them out more. Here’s to less nays and a karmic circle of yays.\n\n\n  \n    \n      My most common yay.&nbsp;&#8617;\n    \n    \n      My most common nay.&nbsp;&#8617;\n    \n  \n\n",
  tags: [],
  id: 43
});
index.add({
  title: "Thunder Mountain",
  category: "adventures",
  content: "Mom and I did the 1.3 mile hike around Thunder Mountain in Greenwich today.\n\n\n\n\n\n\n\n \n\n \n\n\nAnd then we took the scenic route home.\n\n\n\n\n",
  tags: ["hiking","recommended","family"],
  id: 44
});
index.add({
  title: "San Francisco all weekend",
  category: "adventures",
  content: "I worked out of the SF Mapbox office last week and then hung around for the weekend. Adventure was had (along with cocktails, sunburns, and getting 10,000 steps).\n\nAño Nuevo beach\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nSanta Cruz\n\n\n\n\n\n\nAño Nuevo State Park\n\n\n\n\n\n\n\nAround SF\n\n\n\n\n\n\n\n\nTwin Peaks\n\n\n\n\n\n\n",
  tags: ["Mapbox","hiking","friends"],
  id: 45
});
index.add({
  title: "Breathe with your stomach",
  category: "notes",
  content: "A couple months ago, I was chewing on an idea for a slide for my FOSS4GNA talk and I needed to write it out. Knowing that The Pastry Box Project had opened their submissions, I worked on the idea and massaged it into something that I enjoyed.\n\nI’m so honored and excited that they accepted my piece!\n\nRead Breathe with your stomach on The Pastry Box Project.\n",
  tags: ["yay"],
  id: 46
});
index.add({
  title: "Writing for everyone",
  category: "code",
  content: "A couple weeks ago I gave my talk Writing for everyone at FOSS4G NA. I had a great time! You can click through my slides below, follow along with my notes, or watch the video.\n\n\n\nThe slides are built with Big and Jekyll. At first I was just going to work in a flat HTML file, but then I got the itch.\n\nDirectories! Pages! Organization! Front-matter! Logic!\n\nI wove Big into Jekyll and came up with a nice workflow. Each slide is a Jekyll post. I organized sections into folders. I used front matter properties to organize slide styles. Oh and that notes page up top? It’s pulling each slide/posts notes data from the front matter. Pretty handy. Check out the repo.\n",
  tags: ["Mapbox","maps","conference"],
  id: 47
});
index.add({
  title: "2014/2015 Winter",
  category: "playlists",
  content: "\n",
  tags: [],
  id: 48
});
index.add({
  title: "The bird feeder",
  category: "notes",
  content: "Swoosh.\nPlunk.\nFlick.\nFlick.\nFlickflick.\nTap.\nTaptaptaptaptap.\nSwoosh.\n\nAll morning.\n\n\n\n\n\n\n\n\nA pair of cardinals and a bluejay also frequent the feeder, but they’re camera shy.\n\n\n",
  tags: [],
  id: 49
});
index.add({
  title: "San Francisco real quick",
  category: "adventures",
  content: "I was in Burlingame and San Francisco this past week for FOSS4G NA. Slides and video to come, but for now:\n\n\n\n\n\n\n\n\n\n",
  tags: ["Mapbox"],
  id: 50
});
index.add({
  title: "Showshoeing in Rensselaerville",
  category: "adventures",
  content: "The best way down the hill is on your belly, like a penguin.\n\n\n\n \n\n\n\n\n\n\n\n\n\n\n",
  tags: ["fresh air","hiking"],
  id: 51
});
index.add({
  title: "Sleep Pajamas and Work Pajamas",
  category: "code",
  content: "A year later, I’m back chatting with Tim:\n\n\n  Tim talks with Katy DeCorah about moving jobs, working at Mapbox, working remotely, tinkering with code, and more\n\n\nThanks for having me again, Tim!\n\n(Unfortunately, this podcast was removed from GoodStuff FM.)\n",
  tags: ["podcasts"],
  id: 52
});
index.add({
  title: "Weaving data into GeoJSON with Jekyll",
  category: "code",
  content: "Say you have a dataset for a handful of countries or all the countries, or maybe a handful of states or all the states. You want to assign your data to each state or country as a polygon of that area, not a point, so you can do fun colors or popups and make a darn cool map.\n\nSomething like this:\n\n\n\n\n\nSo at this point your thought process might be you’re like, “Ok, where do I start?” and then you think, “Ok, maybe I’ll do it by hand!”\n\nBut have you seen what the coordinates for a single GeoJSON polygon of a state looks like?\n\n[[[-87.359296,35.00118],[-85.606675,34.984749],[-85.431413,34.124869],[-85.184951,32.859696],[-85.069935,32.580372],[-84.960397,32.421541],[-85.004212,32.322956],[-84.889196,32.262709],[-85.058981,32.13674],[-85.053504,32.01077],[-85.141136,31.840985],[-85.042551,31.539753],[-85.113751,31.27686],[-85.004212,31.003013],[-85.497137,30.997536],[-87.600282,30.997536],[-87.633143,30.86609],[-87.408589,30.674397],[-87.446927,30.510088],[-87.37025,30.427934],[-87.518128,30.280057],[-87.655051,30.247195],[-87.90699,30.411504],[-87.934375,30.657966],[-88.011052,30.685351],[-88.10416,30.499135],[-88.137022,30.318396],[-88.394438,30.367688],[-88.471115,31.895754],[-88.241084,33.796253],[-88.098683,34.891641],[-88.202745,34.995703],[-87.359296,35.00118]]]\n\nUgh.\n\nAnd what about a country?\n\n[[[[-65.5,-55.2],[-66.45,-55.25],[-66.95992,-54.89681],[-67.56244,-54.87001],[-68.63335,-54.8695],[-68.63401,-52.63637],[-68.25,-53.1],[-67.75,-53.85],[-66.45,-54.45],[-65.05,-54.7],[-65.5,-55.2]]],[[[-64.964892,-22.075862],[-64.377021,-22.798091],[-63.986838,-21.993644],[-62.846468,-22.034985],[-62.685057,-22.249029],[-60.846565,-23.880713],[-60.028966,-24.032796],[-58.807128,-24.771459],[-57.777217,-25.16234],[-57.63366,-25.603657],[-58.618174,-27.123719],[-57.60976,-27.395899],[-56.486702,-27.548499],[-55.695846,-27.387837],[-54.788795,-26.621786],[-54.625291,-25.739255],[-54.13005,-25.547639],[-53.628349,-26.124865],[-53.648735,-26.923473],[-54.490725,-27.474757],[-55.162286,-27.881915],[-56.2909,-28.852761],[-57.625133,-30.216295],[-57.874937,-31.016556],[-58.14244,-32.044504],[-58.132648,-33.040567],[-58.349611,-33.263189],[-58.427074,-33.909454],[-58.495442,-34.43149],[-57.22583,-35.288027],[-57.362359,-35.97739],[-56.737487,-36.413126],[-56.788285,-36.901572],[-57.749157,-38.183871],[-59.231857,-38.72022],[-61.237445,-38.928425],[-62.335957,-38.827707],[-62.125763,-39.424105],[-62.330531,-40.172586],[-62.145994,-40.676897],[-62.745803,-41.028761],[-63.770495,-41.166789],[-64.73209,-40.802677],[-65.118035,-41.064315],[-64.978561,-42.058001],[-64.303408,-42.359016],[-63.755948,-42.043687],[-63.458059,-42.563138],[-64.378804,-42.873558],[-65.181804,-43.495381],[-65.328823,-44.501366],[-65.565269,-45.036786],[-66.509966,-45.039628],[-67.293794,-45.551896],[-67.580546,-46.301773],[-66.597066,-47.033925],[-65.641027,-47.236135],[-65.985088,-48.133289],[-67.166179,-48.697337],[-67.816088,-49.869669],[-68.728745,-50.264218],[-69.138539,-50.73251],[-68.815561,-51.771104],[-68.149995,-52.349983],[-68.571545,-52.299444],[-69.498362,-52.142761],[-71.914804,-52.009022],[-72.329404,-51.425956],[-72.309974,-50.67701],[-72.975747,-50.74145],[-73.328051,-50.378785],[-73.415436,-49.318436],[-72.648247,-48.878618],[-72.331161,-48.244238],[-72.447355,-47.738533],[-71.917258,-46.884838],[-71.552009,-45.560733],[-71.659316,-44.973689],[-71.222779,-44.784243],[-71.329801,-44.407522],[-71.793623,-44.207172],[-71.464056,-43.787611],[-71.915424,-43.408565],[-72.148898,-42.254888],[-71.746804,-42.051386],[-71.915734,-40.832339],[-71.680761,-39.808164],[-71.413517,-38.916022],[-70.814664,-38.552995],[-71.118625,-37.576827],[-71.121881,-36.658124],[-70.364769,-36.005089],[-70.388049,-35.169688],[-69.817309,-34.193571],[-69.814777,-33.273886],[-70.074399,-33.09121],[-70.535069,-31.36501],[-69.919008,-30.336339],[-70.01355,-29.367923],[-69.65613,-28.459141],[-69.001235,-27.521214],[-68.295542,-26.89934],[-68.5948,-26.506909],[-68.386001,-26.185016],[-68.417653,-24.518555],[-67.328443,-24.025303],[-66.985234,-22.986349],[-67.106674,-22.735925],[-66.273339,-21.83231],[-64.964892,-22.075862]]]]\n\nDouble ugh.\n\nImaging trying to traverse a GeoJSON file filled with all that ugh? No, thank you.\n\nJekyll to the rescue\n\nI found a better workflow with Jekyll.\n\nAfter a quick search I found a GeoJSON file with all the countries. I regex’d it into yml format and saved it to my _data folder (in this repo) as countries.yml. That will serve as a reference file; I don’t need to touch it. Actually, Atom will barf if I try to open it, so it stays sealed tight.\n\nNext, I created another file (leave.yml). This is the data that I want to weave in with the country data. For each country, I made sure to use the same exact country name found in countries.yml because later I’ll evaluate the name to match the data up.\n\n- country: United States of America  leave: 0- country: Mexico  leave: 12\n\nI created a Jekyll-ized JS file to output the GeoJSON as a variable. Here’s how I did it:\n\n\n  First, I looped through the countries data.\n  Inside that loop, I looped through my data file.\n  Inside that loop, I told Jekyll that I only want results when the country name matches the country names in my data file.\n  I customized the feature properties based on my data and how they should look.\n\n\nThe code looks like this:\n\nvar countryData = {  \"type\": \"FeatureCollection\",  \"features\": [{% for s in site.data.countries %}{% for x in site.data.leave %}{% if s.country == x.country %}    {      \"type\": \"Feature\",      \"properties\": {        \"name\": \"{{s.country}}\",        \"leave\": {{x.leave}},        \"title\": \"{{s.country}}\",        \"description\": \"Mothers receive {{x.leave}} weeks paid leave in {{s.country}}\",        \"fill\": \"{% if x.leave == 0 %}#fff{% elsif x.leave &lt;= 26 %}#aad8f1{% elsif x.leave &lt;= 52 %}#4bc6df{% elsif x.leave &gt;= 52.1 %}#197caa{% endif %}\"      },      \"geometry\": {        \"type\": \"{{s.type}}\",        \"coordinates\": {{s.coordinates}}      }    },{% endif %}{% endfor %}{% endfor %}  ]};\n\nAnd here’s what it looks like once Jekyll gobbles it up and spits it out. Now I can load that GeoJSON on a map!\n\nThe workflow ends up being painless. I can make updates to my data file and once Jekyll runs, my map updates. Also, I followed the same process with state data that I got from Mapbox, so I can do some state shape and data matchmaking.\n\nCheck out repo with all the files, data, and fun. And, hey, guess what! I wrote about building a GeoJSON file with Jekyll before — Jekyll and GeoJSON.\n",
  tags: ["GeoJSON","Mapbox","Jekyll"],
  id: 53
});
index.add({
  title: "Seasonal posts",
  category: "code",
  content: "After flipping through past posts, I realized that my lush green static map didn’t match wintery posts. For example, Christmas day hike. It’s winter, nothing is green. Everything is white and then gray and then cold and then sometimes sad. So I needed a map style to match winter (minus the sad).\n\n\n\n\n\n\n\nDefault style on the left, winter style on the right. (Read more about my Jekyll-generated Mapbox static maps.)\n\nAt first I created an in-post variable that could swap out my default map ID {% if page.mapid %}, but that would need upkeep. I decided to evaluate the post’s month and assign a map ID based on the season – the post’s month.\n\nFirst, I needed to capture the post’s month. (It seems like I can only grab this value as a string.)\n\n{% capture month %}{{page.date | date: \"%m\"}}{% endcapture %}\n\nNext, I evaluated the month – December, January, February, and March will receive the winter map ID from my config, while other months will receive my default map ID.\n\n{% if month == \"12\" or month == \"01\" or month == \"02\" or month == \"03\" %}{{site.mapid-winter}}{% else %}{{ site.mapid }}{% endif %}\n\nI dropped this statement in my static map call and that was it! All my past winter month posts switched to my winter map ID. A fall map style may come in handy, but I’ll stick with just two for right now. See the full code.\n\nBy the way, for my map styles I’m using Mapbox Outdoors and Winter Wonderland both with small tweaks to remove the labels.\n",
  tags: ["Mapbox","Jekyll","static map"],
  id: 54
});
index.add({
  title: "Frozen Papscanee Preserve",
  category: "adventures",
  content: "The trail was a sheet of ice, but a pretty sheet of ice.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  tags: ["time travel","fresh air","hiking"],
  id: 55
});
index.add({
  title: "Williamstown",
  category: "adventures",
  content: "Or, how we beat cabin fever by fleeing cold New York for cold Massachusetts for one night.\n\n\n\n\n\n\n\n\n\n\nBecause the hotel had a sauna.\n\nAnd HotelTonight :+1:.\n",
  tags: ["yay"],
  id: 56
});
index.add({
  title: "From Haml to Yaml",
  category: "code",
  content: "Way back in May, I built a pen based on MDN’s article to visualize and compare all CSS lengths. Here’s the original pen:\n\nSee the Pen CSS Units by Katy DeCorah (@katydecorah) on CodePen.\n\nTo store each length name and metadata, I created a multidimensional array in Haml that I looped through. I did this so I could easily change the markup output. I also used AngularJS for the functionality: to update the inputs and to toggle the types.\n\nTo Jekyll\n\nI decided to create a Jekyll gh-pages repo and open up the tool there. I exported the CodePen and created a local Jekyll site. Once I organized the files, I refactored my code to interpolate the AngularJS tags.\n\nAt first I copied and pasted the compiled HTML, but I knew it was going to be a pain to make any markup changes. I ended up reformatting the Haml array to Yaml (via regex find and replace):\n\n- length: em  type: font-relative  description: This unit represents the calculated font-size of the element. If used on the font-size property itself, it represents the inherited font-size of the element.\n\nI saved the file into the Jekyll _data folder. Using a loop, I ran through each item and rebuilt markup output. My code looks something like this:\n\n{% for item in site.data.lengths %}&lt;div class=\"example-container\" data-toggle=\"popover\" data-content=\"{{item.description}}\" title=\"{{ item.length }}, {{item.type}}\"&gt;&lt;div class=\"example\" style=\"width: [[ unit ]]{{ item.length }}; height: [[ unit ]]{{ item.length }}\" title=\"[[unit]]{{item.length}}\"&gt;&lt;/div&gt;&lt;/div&gt;{% endfor %}\n\nTo make content changes, I’ll update the Yaml. To make layout changes, I’ll update the HTML. Party :tada:.\n\nThe CSS Ruler\n\nFeast your eyes on the live CSS Ruler or jump into the code.\n\np.s. Uncheck all the length types to unlock an Easter egg.\n",
  tags: ["CodePen","Yaml","Haml","Jekyll","AngularJS"],
  id: 57
});
index.add({
  title: "Christmas day hike",
  category: "adventures",
  content: "A morning hike at the Papscanee Island Nature Preserve.\n\n\n\n \n\n\n\n\n\n\n \n\n\n\n \n\n\n",
  tags: ["time travel","fresh air"],
  id: 58
});
index.add({
  title: "2014 Fall",
  category: "playlists",
  content: "\n",
  tags: [],
  id: 59
});
index.add({
  title: "Snowflaker",
  category: "code",
  content: "See the Pen Snowflaker by Katy DeCorah (@katydecorah) on CodePen.\n\nI really wanted to build something last night, heck, something seasonal. Something to celebrate the fact that I’m done teaching and my free-time is katy-time.\n\nI decided to try a snowflake.\n\nBuilding it out\n\nWith Haml, I spit out 3 div tags to act as the snowflake’s .spindles. I paired the Haml loop with a Sass loop to criss cross the spindles dynamically.\n\n\n\nI created $w to manage the width of each spindle and sized the height at 1em. I always like to have at least one dimension at 1em, because I’ll drop a font-size on that element or its parent to allow the project to scale with respect to 1em.\n\nNext, I used box-shadow on the :before and :after to build the snowflake patterns off the spindles. This took some time to get just right because I had to think in terms of each spindle. Each spindle is part of the pattern pie. Eventually, I got the :before to look like this thanks to box-shadow:\n\n\n\nI added box-shadow to the :after to build the final pattern:\n\n\n\nTo really break it down, a single spindle looks like this:\n\n\n\nNow put your finger at the top of the spindle and turn the bottom at (360/number of spindles) degrees and you’ll get the snowflake pattern.\n\nMaking it scale\n\nI refactored the code to use variables wherever possible with the premise that if I add more spindles then the pattern would purr.\n\nAnd it did!\n\nIf you update the number of spindles in the Haml and Sass, you’ll get a different snowflake. Here is 3 through 26 spindles:\n\n\n\nYou can play with the width of the spindles and patterns, too!\n\nThat was fun.\n",
  tags: ["CodePen","Sass","Haml","box-shadow"],
  id: 60
});
index.add({
  title: "San Francisco",
  category: "adventures",
  content: "I spent last week working out of the Mapbox San Francisco office.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nSuch an awesome week.\n",
  tags: ["Mapbox","yay","hiking"],
  id: 61
});
index.add({
  title: "New York City",
  category: "adventures",
  content: "Took the 6:15 AM train to Penn Station with a friend. Walked around, saw the Christmas show, had a delicious dinner, and then took the 5:15 PM train back to Albany.\n\n\n\n\n\n",
  tags: ["time travel","friends"],
  id: 62
});
index.add({
  title: "Jekyll and GeoJSON",
  category: "code",
  content: "Add this post to my love-affair-with-Jekyll-and-Mapbox series.\n\nA cool thing happens\n\nTo summon Jekyll to a page, you use those six hyphens:\n\n------\n\nPut variables inside or don’t. Either way Jekyll will gobble it up and make something awesome. Jekyll doesn’t discriminate.\n\n.html? Sure.\n\n.md? Yup.\n\n.geojson? Let’s try it.\n\nMaking GeoJSON\n\nA GeoJSON file has a lot of repetition – swap out different coordinates here and maybe a style change there. The pattern lends itself to building a template and adding variables.\n\nAll my adventure posts have coordinates that I use to build a static map header. I decided that I wanted to grab all those coordinates, weave them into a GeoJSON file, and then load it on a single adventure map.\n\nTo start, I worked on my loop and found that this was the best route:\n\n{% assign places = (site.posts | where: \"category\", \"adventures\") %}{% for place in places %}  &lt;!-- gooey, caramel center --&gt;{% endfor %}\n\nI created the file: adventures.geojson and added those six magical hyphens. Next, I wove and massaged until GeoJSON happened:\n\n{  \"type\": \"FeatureCollection\",  \"features\": [{% assign places = (site.posts | where: \"category\", \"adventures\") %}{% for place in places %}    {      \"type\": \"Feature\",      \"properties\": {        \"title\": \"{{ place.title }}\",        \"image\": \"{{ place.image }}\",        \"url\": \"{{site.url}}{{place.url}}\",      },      \"geometry\": {        \"type\": \"Point\",        \"coordinates\": [{{ place.coordinates }}]      }    }{% if forloop.rindex &gt; 1 %},{% endif%}{% endfor %}  ]}\n\nThen, I added a few conditional statements to make sure my data looked tight:\n\n\n  Capture post year. I assigned a marker color based on the year the post was published.\n  Evaluate size of coordinates array. I have at least one post with more than one set of coordinates. The logic is that if a post has one set of coordinates then its a Point or else it’s a MultiPoint.\n  Smart symbol. Based on a post’s tags, I added a symbol to its marker.\n\n\nCheck out the raw Jekyll GeoJSON with all my tweaks and the fresh out-the-oven GeoJSON.\n\nAdventure map\n\nThe map lives here, but hey, I’ll save you a trip:\n\n\n\n\n\n\n\n\nI built the map with Mapbox.js. I sourced the functionality of my map from Mapbox.js examples. I used:\n\n\n  Load GeoJSON from a URL\n  Custom toolips\n  Fit map to markers\n  Leaflet popup\n\n\nMy map looks tight and now any adventure post will automatically be added to my map.\n\nOn tap\n\nA few things I would like to work on:\n\n\n  Polish colored markers. Right now the markers are colored by year, but that’s not super intuitive. I would like to find a better way to differentiate.\n  Polish MultiPoint. This could be styled slightly different to bear a relationship with all the points in the feature.\n  Style a map for my site. Right now I’ve been using a map that I styled with Editor, but I should really get my hands dirty with Studio.\n\n\nCan you tell that I work for Mapbox now? &lt;3\n",
  tags: ["Jekyll","Mapbox","GeoJSON"],
  id: 63
});
index.add({
  title: "How I write",
  category: "notes",
  content: "This is a devlog I wrote at Mapbox that inspired my talk Writing for everyone.\n\n…I thought I’d share some of my personal writing tips. Just a few things I picked up from teaching (synchronous), my instructional design days (asynchronous), and for-fun blog writing.\n\nHey, dummy.\n\n\n\nTo reassure the reader, you might want to say, “It’s easy!”. Unfortunately, that can backfire. If your reader doesn’t agree, then s/he will probably bail. I like to assume that everything is hard (because it is).\n\nI recommend checking out Chris Coyier’s Words To Avoid in Educational Writing and Brad Frost’s Just.\n\nIt all depends on context, but here’s a quick hit list of words you might want to avoid:\n\n\n  just\n  easy or simple\n  of course\n\n\nJargon meet Acronym. Acronym meet Jargon.\n\nI like to introduce jargon or acronyms like I would introduce two people. Start with full names and explain what they do. Then after that they’ll start using first names, have inside jokes, and start hanging out without you on Instagram.\n\nWho did what in where?\n\n\n\n\n  After the file is saved…\n\n\nHold up. Do I save the file? Does the file save automatically?\n\n\n  After you save the file…\n\n\nGot it, I save the file.\n\nIf the user needs to do something, tell them!\n\nEasy on the scrolls\n\nI’m an offender of scrolling on a page just to get to the good parts. I like to make it easy for others to do the same.\n\nHere are a few tips:\n\n\n  Use headings to chunk up content into sections.\n  Write each section so that it’s strong enough to stand independently.\n\n\nReorganize\n\nI find that fat paragraphs can be exhausting. If possible, I’ll use a table or list to make it more digestible.\n\n\n\t\t\n\t\t\t\n\t\t\t\tInstead of this\n\t\t\t\tTry this\n\t\t\t\n\t\t\n\t\t\n\t\t\t\n\t\t\t\tEach completed well drilling application must contain a detailed statement including the following information: the depth of the well, the casing and cementing program, the circulation media (mud, air, foam, etc.), the expected depth and thickness of fresh water zones, and well site layout and design.\n\t\t\t\t\n\t\t\t\t\tWith your application for a drilling permit, provide the following information:\n\t\t\t\t\t\n\t\t\t\t\t\tDepth of the well;\n\t\t\t\t\t\tCasing and cementing program;\n\t\t\t\t\t\tCirculation media (mud, air, form, etc)\n\t\t\t\t\t\tExpected depth and thickness of fresh water zones; and \n\t\t\t\t\t\tWell site layout and design.\n\t\t\t\t\t\n\t\t\t\t\n\t\t\t\n\t\t\n\t\n\nExample source\n\nKeep it plain\n\nI keep a dictionary with me almost every time I read a book. Because big words. When writing a tutorial, I try to avoid words that might make a reader reach for the dictionary. I don’t want to overload the reader or make him/her glaze over. Instead, I strive to write in plain language.\n",
  tags: ["writing","Mapbox"],
  id: 64
});
index.add({
  title: "Great Dune",
  category: "adventures",
  content: "A very fall hike with an old friend on trailhead 8 (Great Dune) of the Albany Pine Bush.\n\n\n\n \n\n\n",
  tags: ["hiking","friends","pie","time travel","recommended"],
  id: 65
});
index.add({
  title: "Vroman’s Nose",
  category: "adventures",
  content: "Today we hiked up to Vroman’s Nose.\n\n\n\n\n\n\n\n\n\n\nThen had an awesome lunch at Middleburgers BBQ and picked up a half dozen at the Schoharie Carrot Barn.\n\n\n\n\n\n",
  tags: ["hiking","fresh air","donuts","recommended"],
  id: 66
});
index.add({
  title: "Half Share",
  category: "notes",
  content: "We enjoyed 20 weeks of the Fox Creek Farm CSA.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nWe missed week 17 and week 19 due to adventures and busy schedules.\n",
  tags: [],
  id: 67
});
index.add({
  title: "Elizabethtown II",
  category: "adventures",
  content: "A college roommates weekend in Elizabethtown. A weekend way over due.\n\nWhiskey, pumpkin carving, wine tasting, hot tubs, mulled wine, and goat cheese. And every drive was beautiful.\n\n\n\n\n\n\n\n\nGrant, Becky, me, and Laura - respectively.\n\n",
  tags: ["friends","fresh air"],
  id: 68
});
index.add({
  title: "Rhode Island",
  category: "adventures",
  content: "We spent last weekend in Newport and the start of the week in Providence, Rhode Island.\n\nLobster rolls, ocean air, zoo animals, donuts, s’mores everything, and macaroons. (Macaroons not pictured as they were gobbled.)\n\n\n\n \n\n\n\n\n\n\n \n\n\n\n \n\n\n\n \n\n\n",
  tags: ["road trip"],
  id: 69
});
index.add({
  title: "2014 Summer",
  category: "playlists",
  content: "\n",
  tags: [],
  id: 70
});
index.add({
  title: "Adirondack Balloon Festival 2014",
  category: "adventures",
  content: "\n  Wake up at 3:45 am.\n  Drive to Glens Falls.\n  Take the 5:10 city bus to the airport.\n  Arrive at airport at 5:30.\n  Find the coffee vendor.\n  Stand, talk, shiver; make mental note to bring a scarf next year.\n  Speculate if it’s too windy for flight.\n  Rejoice as the sun rises and balloons roll out.\n  Take pictures while trying to avoid the crowd.\n  Take bus back to downtown.\n  Eat breakfast at the Peppermill.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nThat’s our Adirondack Balloon Festival ritual. It doesn’t seem to get old.\n",
  tags: ["family","fresh air","ADK Balloon Festival"],
  id: 71
});
index.add({
  title: "DRY Yaml",
  category: "code",
  content: "For the class that I’m teaching this Fall, I created a Jekyll site to hold the course materials. I’m in the camp that Jekyll can do anything and I want to use it always (Jekyll, you fantastic son of a bitch).\n\nWhile working on variables in the config, I wondered if there’s a better way to write the following:\n\ncoursename: Intermediate Interactive Designdescription: Intermediate Interactive Design, Informatics Department, University at Albany, Fall 2014\n\nAfter some “concatenate Yaml” googling, I found that you can’t concatenate, but you can repeat nodes.\n\nI tidied up and followed the patterns:\n\ncoursename: &amp;course_name Intermediate Interactive Designdescription: - *course_name - Informatics Department - University at Albany - Fall 2014\n\nRepeating nodes works by creating a keyword and placing it in the variable to be repeated. In this case, I used &amp;course_name. Next, I dropped *course_name where I want &amp;course_name to be repeated.\n\nYou set the variable with &amp;keyword and recall it using *keyword.\n\n\n  Repeated nodes (objects) are first identified by an anchor (marked with the ampersand - “&amp;”), and are then aliased (referenced with an asterisk - “*”) thereafter.\n— Yaml Spec\n\n\nYou can repeat multiple nodes:\n\ncoursename: &amp;course_name Intermediate Interactive Designsemester: &amp;this_semester Fall 2014description: - *course_name - Informatics Department - University at Albany - *this_semester\n\nNow I can use either variable as I normally would and the repeated node will slide in smooth. Oh so smooth.\n\nYou might notice that I moved the description to an array. This gives me a little more flexibility with output.\n\nNow I can use {{ site.description | join: \", \" }} or even {{ site.description | join: \"&lt;br&gt;\" }} to output that array real nice like.\n",
  tags: ["Yaml","Jekyll"],
  id: 72
});
index.add({
  title: "Kaaterskill Falls",
  category: "adventures",
  content: "This weekend we visited our families, ate a ton a food, and hiked to Kaaterskill Falls in the Catskills.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  tags: ["family","fresh air","treats","hiking","recommended"],
  id: 73
});
index.add({
  title: "Fall 2014, IINF 362",
  category: "teaching",
  content: "Today I start teaching Intermediate Interactive Design at the University at Albany.\n\nWhat they’ll learn:\n\n\n  Github\n  Responsive Web Design\n  Jekyll\n  Accessibility\n  Web performance\n\n",
  tags: ["time travel"],
  id: 74
});
index.add({
  title: "Two years ago on CodePen",
  category: "code",
  content: "Two years ago on CodePen I was picked for the first time ever.\n\nI know this because I found a screenshot on my computer a few days ago:\n\n\n\n\n\nI took the screenshot at the time because I was shocked. Total double take. Nobody had seen something I made like this before. I was just messing around. Maybe I should delete it, it’s not finished. People are seeing. People will see. Hot sweat. Cold sweat. Do something.\n\nI finished it.\n\nSee the Pen dropbox! by Katy DeCorah (@katydecorah) on CodePen.\n\nAfter two years of getting better at CSS, learning Sass and Haml, and starting this site to write about my code, I’m so glad that I finished that little Dropbox pen.\n\nThank you CodePen and thank you to anyone who has ever hearted or viewed one of my pens!\n",
  tags: ["CodePen","yay"],
  id: 75
});
index.add({
  title: "Five Rivers",
  category: "adventures",
  content: "This weekend we explored Five Rivers in Delmar.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  tags: ["fresh air","hiking","time travel","recommended"],
  id: 76
});
index.add({
  title: "columns",
  category: "code",
  content: "After writing the Guide to Responsive-Friendly CSS Columns on CSS-Tricks, I was invited back to write up an Almanac post for each multi-column property.\n\nI cooked up some new examples to showcase different ways to use columns.\n\nCheck out the new additions to the CSS-Tricks Almanac:\n\n\n  columns\n  column-count\n  column-fill\n  column-gap\n  column-rule\n  column-span\n  column-width\n\n",
  tags: ["elsewhere","columns","CSS"],
  id: 77
});
index.add({
  title: "Cascade Falls",
  category: "adventures",
  content: "Yesterday morning we work up early and drove out to North Adams to explore Cascade Falls once again.\n\nOn the drive there we saw a family of black bears crossing the road. I got a quick snap of one of the babies.\n\n\n\nWe came to the falls prepared this time. We brought extra shoes, shirts, shorts, towels, and waterproof cases for our electronic devices. We were ready to storm the base of the waterfall.\n\nThe water was not raging like it was last June, which made wading to the waterfall much easier and slightly drier.\n\nThe water was cold, but it was a real treat.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nAfter the falls we picked up whoopie pies, bread, and fresh peaches from the Williamstown Farmers’ market. Then we had an awesome late breakfast the Chef’s Hat Diner.\n\nWe topped off the night by seeing Boyhood at the Spectrum and grabbing a slice of pizza on Lark.\n\nAwesome day.\n",
  tags: ["fresh air","yay","waterfall","recommended"],
  id: 78
});
index.add({
  title: "A case for :empty",
  category: "code",
  content: "At work today, I’m styling an app. The code is automatically generated, making me a CSS jockey. It can be challenging, but it makes me flex my CSS powers. This morning I found a great use case for :empty.\n\nCheck out the post on CodePen\n",
  tags: ["elsewhere","CSS","CodePen"],
  id: 79
});
index.add({
  title: "Pine Hollow Arboretum",
  category: "adventures",
  content: "Yesterday we visited the Pine Hollow Arboretum in Slingerlands. We saw the sign for the arboretum during one of our drives out to Rensselaerville.\n\nAt the Visitor Center we were given a map and a self-guided tour pamphlet. We also received a quick little tutorial on how to read the map and general access to the grounds. Then we were off into this magical, beautiful place, with the hum of the highways in the background.\n\nThis might be the best place to satisfy the urge to (safely) get lost in the woods. It’s so delightful. Filled with paths, ponds, and interesting trees. We were there for about an hour and only covered about half of the grounds.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nRecipe for the perfect day date:\n\n\n  Get lost inside the Pine Hollow Arboretum.\n  Enjoy homemade ice cream at Toll Gate.\n  optional: Buy two freshly steamed lobsters at ShopRite for an early dinner.\n\n",
  tags: ["fresh air","recommended"],
  id: 80
});
index.add({
  title: "Static Mapbox API for Jekyll posts",
  category: "code",
  content: "I’ve done Static Google Maps Image for Jekyll Posts, Mapbox for Jekyll Posts, but it’s time to settle down.\n\nI’m going with the static Mapbox API.\n\nFront matter\n\nThe front matter of this post, supplies locations and coordinates.\n\ncoordinates: - -73.7236504,43.2294791locations: Moreau Lake State Park\n\nAs it stands, the locations variable doesn’t help generate the static map. The Mapbox API accepts coordinates, but I want to keep the locations as a label and for future flexibility.\n\nZoom is also available as a front matter variable, but I set a default of 15, which generally works for most of my maps.\n\nGenerating the map\n\nI updated my map include to generate the static map:\n\n{% if page.coordinates %}  &lt;div class=\"post-map-header\"&gt;  \t&lt;div style=\"background-image:url(http://api.tiles.mapbox.com/v4/{{ site.mapid }}/{% for coordinate in page.coordinates limit:1 %}{{ coordinate }}{% endfor %},{% if page.zoom %}{{ page.zoom }}{% else %}15{% endif %}/1280x300.png?access_token={{ site.mapbox-token }})\" class=\"post-location-image\"&gt;&lt;/div&gt;  &lt;/div&gt;{% endif %}\n\nI placed my public api token and mapid in my config file, so that I can quickly edit those items when necessary.\n\nNow a static Mapbox map will generate when I create a post that has coordinates defined in the front matter.\n\nStyling on Mapbox\n\nTo style the map, I opened it up on the Mapbox site. I started with one the preset styles. I changed the terrain color to the background color of my site. Next, I adjusted the alpha of the streets, buildings, areas, and water to about 50%. This lightened up the map without me needing to do so in CSS.\n\nSome of the maps have a very cool effect, such as the map I used for this post (as see in my Palmertown Mountain Range post). I’m really digging it.\n\nI updated the front matter on all my map-having posts with coordinates. Now this entire site runs on the static Mapbox API. Also, I upgraded to Mapbox v4 and the quality is amazing!\n",
  tags: ["maps","Jekyll","Mapbox","API"],
  id: 81
});
index.add({
  title: "Guide to Responsive-Friendly CSS Columns",
  category: "code",
  content: "With CSS columns you can create a print-inspired layout with little added markup that can adapt beyond a fixed canvas. A supported browser will make calculations to wrap and balance content into tidy columns. If you’re already working with a fluid layout, the columns will reflow automatically. With the right combination of properties, CSS columns can be an interesting layout option that is responsive-friendly while degrading gracefully.\n\nRead the rest on CSS-Tricks…\n\np.s. I am so excited to be on CSS-Tricks! Thank you, Chris!\n",
  tags: ["elsewhere","columns","CSS","yay"],
  id: 82
});
index.add({
  title: "Elizabethtown",
  category: "adventures",
  content: "This weekend we stayed with friends in Lewis.  On Saturday we woke up early to catch the town-wide garage sales in Elizabethtown in the spirit of E-town Day. Our haul included: 1 over-sized sweater, 2 books, and 3 hats.\n\nIn the afternoon we took a little excursion out to Lake Champlain and Ausable Chasm.\n\n\n\n\n\n\n\n\n\n\n\n\nThat night we threw a couple blankets down on the E-town golf course and enjoyed the fireworks.\n\nHot tubs, pools, coconut rum, good company, and poor cell phone service make for a top-notch Summer weekend.\n",
  tags: ["friends","fresh air"],
  id: 83
});
index.add({
  title: "Favorite Haml snippets",
  category: "code",
  content: "I love writing my pens in Haml, but I still have a hard time remembering the syntax. I created a post on my CodePen blog as a running reference guide of all the fun Haml snippets that I have used to date.\n\nCheck out the post on CodePen\n",
  tags: ["elsewhere","Haml","CodePen"],
  id: 84
});
index.add({
  title: "2014 Spring",
  category: "playlists",
  content: "\n",
  tags: [],
  id: 85
});
index.add({
  title: "Mini Boston Cream Pies",
  category: "epicurean",
  content: "\n\n\n\nFor Father’s Day, I made our dads their very own 3″ Boston Creme Pie.\n\nJust a couple weeks ago, I picked up a set of 3 3″ spring form pans. They came in handy for this recipe, which is for a standard 9″ pie. I had exactly enough batter and more than enough icing and filling to make 3 little pies.\n\nEach pie fit perfectly in a 4-cupcake box.\n\nMini-cakes are my new jam.\n",
  tags: ["time travel","treats","family"],
  id: 86
});
index.add({
  title: "Asheville",
  category: "adventures",
  content: "I spent the past week visiting my sister in Asheville. That place never gets old.\n\n\n\n\n\n\n\n\n\n\nSaturday night we saw the Montford Park Players production of Henry V.\n\n\n\n\n\n\nSunday we took the Blue Ridge Parkway to Craggy Gardens and to the Summit of Mount Mitchell.\n\nBlue Ridge Parkway\n\n\n\n\n\n\n\n\nCraggy Gardens\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nMount Mitchell\n\n\n\n\n\n\n\n\n\n\n\nWe took a few strolls around Biltmore. We rewatched Richie Rich after finding out that the movie was filmed there. (Mind blown.)\n\n\n\n\n\n\nI am no longer terrified of my sister’s cat (RE: last year’s trip).\n\n\n\n\n\n\nThe clouds, though. (Can you tell that I had the window seat?)\n\n\n\n\n\n\nFarewell, two week vacation. You were very, very kind to me.\n",
  tags: ["family"],
  id: 87
});
index.add({
  title: "Happy Birthday Blog",
  category: "notes",
  content: "\n\n\n\nA year ago I decided to settle down and find myself a blogging system. I had heard about Jekyll and bandaged together several (okay, a lot) of novice commands to get it set up locally. Whatever the combination was, it worked. I pushed to Github and, hot damn, I had myself a website.\n\nSince then I have poured a lot of love into this gal. Like staying in on the weekends and squealing with glee as I push a new post. Coming home after work and tweaking the layout over and over again. (It’s not there yet, but it will be!) Feeling foolish after I contacted Github support that one time because I didn’t update my gems. Spending hours on potentially useless web projects, but loving every minute of it.\n\nThis site has given me a place and a reason to participate. It’s hard to participate. It’s scary to participate. Yet, my modest number of visitors, Twitter pats on the back, and CodePen hearties all make it worth it. A special thank you to anyone who has visited my site. It keeps me going.\n\n\n  Please raise your cake forks to a year of participating! And may there be many more!\n\n\nA few of my favorite posts from the past year:\n\n\n  Jekyll Data Playlists\n  Heroes Queue\n  Simple Box\n  z-index and transform\n  Static Google Maps Image for Jekyll Posts\n\n\nAnd in case you need to bake your own site a cake, I highly recommend the Brown Betty Bakery Coconut Cake.\n\n&lt;3\n",
  tags: ["yay"],
  id: 88
});
index.add({
  title: "Border spinners",
  category: "code",
  content: "See the Pen Twinner Spinner by Katy DeCorah (@katydecorah) on CodePen.\n\nA few days ago, I wanted to create a single element spinner. (Just for funsies.) After several minutes of tinkering, I whipped up Twinner Spinner.\n\nMeet the elements\n\nThe main element, .loader, acts as a container for the spinner. The real magic happens in its pseudo elements. I did this because once you animate a main element it can be tricky to control its pseudo elements. I also used the main element to dictate the size of the project since I’m using ems.\n\nPseudo what\n\nI styled the :before and :after similarly; each element is a 1em circle with a transparent border. However, one element received left and border-left-color values, while the other received right and border-right-color values.\n\nMy use of the border properties may seem redundant, but the elements need a border all around to keep the border from pinching in.\n\nAnimation\n\nOnce I got the elements styled and in place, I created a animation to rotate the elements. I found that by adding an animation-delay to one of the elements, I could give the spinner a little more personality, especially paired with an ease animation-timing-function.\n\nVariable-ing Up\n\nEven though I had everything looking pretty darn sweet, I put variables in where I could. By doing so, I can now control the speed, size, and colors of the spinner from the top of my Sass.\n\nNaturally, I created a few spin-off spinners.\n\n\n\nSee the Pen Twinner Spinner II by Katy DeCorah (@katydecorah) on CodePen.\n\n\nSee the Pen Slicer Spinner by Katy DeCorah (@katydecorah) on CodePen.\n\n\nSee the Pen Twisty Spin by Katy DeCorah (@katydecorah) on CodePen.\n\n\n\nI absolutely love a scalable project with smart variables. It really helps push the boundaries on the simplest of properties.\n\np.s. the color palette I used for all spinners is from Flat UI Colors.\n\n",
  tags: ["CodePen","border","animation","single element","Sass"],
  id: 89
});
index.add({
  title: "Jekyll and AngularJS",
  category: "code",
  content: "I’m a total AngularJS rube, so it took me a few tries to get Angular to work on a Jekyll site. Since both use {{ curly brackets }}, Jekyll will gobble up the brackets first. (And none for AngularJS.)\n\nAfter some digging, I found this Fiddle and I learned about Angular’s interpolate provider.\n\nInterpolate provider will allow you to swap curly brackets for different characters.\n\nI created an example below.\n\nSee the Pen Angular Interpolate Provider Example by Katy DeCorah (@katydecorah) on CodePen.\n",
  tags: ["CodePen","AngularJS"],
  id: 90
});
index.add({
  title: "Huyck Preserve",
  category: "adventures",
  content: "We took a ride out to Rensselaerville and explored the Huyck Preserve again. We took the trail around Lake Myosotis.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nOn the way home, we picked up a jalopeño and a cubanelle pepper plant for the garden.\n\n\n\n\n\n\n",
  tags: ["fresh air","recommended"],
  id: 91
});
index.add({
  title: "Papscanee Island Nature Preserve",
  category: "adventures",
  content: "This morning we went to the Papscanee Island Nature Preserve in Rensselaer. We started at the north entrance of the preserve, giving us a driving tour of the Port of Rensselaer’s oil yard. We didn’t think we were in the right place, until we noticed a trail head at the end of a dead end road.\n\nRight away were were greeted by a giant puddle. We almost turned back, but we shimmied behind the kiosk and stayed dry.\n\n\n\n\n\n\n\n\nThis is one of my favorite trails to date. The preserve has four trails, all relatively short. We started on the white trail, which meandered through a beautiful marsh, an open field, and then met up with the other trails into the woods.\n\n\n\n\n\n\n\n\n\n\n\n\n\nThe preserve sits between a railroad and the Hudson River. There’s an old rail line that cuts through the marsh; it’s really quite beautiful. We were fortunate enough to catch an Amtrak passing by not once, but twice!\n\n\n\n\n\n\n\n\n\nUnfortunately, the trails are a little difficult to navigate as trail markers are few and far between. We accidentally ended up on a trail that the map specifically forbids people to go. Sorry, government.\n\n\n\n\n\n\nWe saw lots of birds, in particular a giant red-headed wood pecker.\n\n\n\n\n\n\n\n\n",
  tags: ["fresh air","recommended"],
  id: 92
});
index.add({
  title: "Raspberry Chocolate Brownies",
  category: "epicurean",
  content: "\n\n\n\nFor Mother’s day, I made our moms these rich brownies.\n",
  tags: ["time travel","brownies","treats","family"],
  id: 93
});
index.add({
  title: "Ja! by Andreas Samuelsson",
  category: "code",
  content: "\nSee the Pen Ja! by Andreas Samuelsson by Katy DeCorah (@katydecorah) on CodePen.\nJa! by Andreas Samuelsson\n\n\nI stumbled upon “Ja!” on Pinterest over the weekend. The bright colors and striking shadow drew me in. I decided to code it out with a Sass function.\n\nGetting started\n\nI started by grabbing the code from my first ever Sass function, DotMama. I striped it down and adjusted the values to output for text-shadow. The new function, shadow(), generates many, cascading shadow rules and gives the appearance of one chunky shadow.\n\n@include text-shadow(shadow(#ff5c31,0,0.1em));\n\nThe function accepts the color of the shadow, the position that the shadow should start, and the width of the shadow.\n\nSpinning with @while\n\nI started by using a @for loop to spin out the shadow values, but it limited my desired output. I wanted the shadow to stop at specific point allowing for customized shadow thickness. With a little digging, I found that @while is much more suitable for this situation. I altered my function to stop adding shadow values once the x value of the shadow equals the value of the shadow width.\n\nStart shadow\n\nI can also tell the function where I want the shadow to start. This value provides an interesting degree of depth, but I have it set to 0.\n\nBelow is a demonstration of the shadow start in use.\n\n\n\n(Please laugh in a Spanish accent in cadence with the animation above before continuing with this post.)\n\nPixels vs ems\n\nI started out by using relative units because a 1px increment will result in the smoothest shadow. I wanted the project to scale proportionately based on font-size, so I shifted the values to allow for ems.\n\nBelow, I blew up the project to demonstrate the difference between the two units. The left is built in pixels and the right in ems.\n\n\n\nWhile the ems are less smooth, it will generate significantly less code than pixels.\n\n\n\nUsing ems looks a little less romantic because the function values must be teeny decimals, but slimer, scalable code is ace.\n",
  tags: ["CodePen","Sass","text-shadow"],
  id: 94
});
index.add({
  title: "word-break or word-wrap?",
  category: "code",
  content: "See the Pen word-break or word-wrap? by Katy DeCorah (@katydecorah) on CodePen.\n\nGiven overflowing text, I always needed to stop and think if I wanted to word-break or word-wrap. I cooked up this little visual guide to help understand how each property works. Alas, the answer is truly in the property name.\n",
  tags: ["CodePen","Haml","Sass","CSS","responsive"],
  id: 95
});
index.add({
  title: "Jekyll data playlists",
  category: "code",
  content: "In 2008, I started creating a playlist for every season. I kept my playlists in iTunes, but have migrated to Rdio. These playlists are my audio diaries. I can listen to one and remember where I was, where I was going, who I was with, and how I felt. I love these playlists.\n\nJail breaking the playlists\n\nWhen I got a new computer in 2012, I didn’t save my playlists in iTunes properly. In short, my files got disconnected from my library. It was a hot mess, but thankfully I had the original iTunes Music Library.xml. I found a great tutorial that taught me how to import the data in the XML into an Access database. Now I had a table containing all my playlists with track title, artist, and album.\n\nNext, I migrated the database to PHPmyadmin. Using PHP I spun out each playlist into markup and pasted the contents into its own post on this site. It worked great, a little time consuming, but it worked.\n\nImporting to Rdio\n\nAfter some more hacking, I was able to import the playlists into Rdio using re/spin. Re/spin easily imports any Last.fm or Spotify playlist into Rdio. The service also accept XSPF. I was able to save each playlist as an XSPF and import it into Rdio.\n\nNot all songs transferred over, but enough did to make it worth it. Re/spin will want to find something if Rdio doesn’t have a match, so beware of some funky replacements. Otherwise, re/spin is a fabulous service.\n\nDatarrhea\n\nAt this point I had my playlist data stored in an SQL table, in Rdio, and in individual posts. I started to feel guilty about shoveling my data in every direction.\n\nI decided to tighten up the process.\n\nJekyll data files\n\nI ditched the database and moved the playlists into a single YAML file. Using PHP, I outputted the playlist data into YAML format. I had to clean out special characters, but in all it worked beautifully. I saved my data into playlists.yml in my site’s _data folder.\n\n\n\nUsing liquid, I could now spin through the data. To test, I created a playlist master page that pulls all the data from playlists.yml into a beautiful list.\n\nThings were looking tighter, but I still had duplicated data on my site. I had the playlists stored in the YAML file and I had the markup I copied and pasted into individual posts.\n\nI put Jekyll to work.\n\n\n  I ripped out the content from all the playlist posts.\n  I matched the names of the posts to the names of the playlists.\n  To my post layout, I added the condition that if the page.category == 'playlists' then include single-playlist.html\n  The single-playlist.html will then loop through playists.yml where the post title equals a playlist name. If the playlist name matches, it will output the data for that playlist only.\n  Since I replaced the content for these posts, I updated my feed to link directly to the Rdio playlist and have no content.\n\n\nNow I can adjust the markup of my playlist posts just by changing single-playlist.html. Likewise, I can control all the playlist data by editing playlists.yml.\n\nAdding new data\n\nMy new workflow for adding a playlist to my site at the end of the season:\n\n\n  Open up the Rdio playlist to be exported.\n  Run the bookmarklet to output the playlist in YAML format (more about this below).\n  Copy and paste the YAML at the bottom of playlists.yml\n  Create a new post title with the same name as the playlist.\n  Serve Jekyll/commit and the playlist data will automatically populate into the new post.\n\n\nRdio bookmarklet\n\nI found this great bookmarklet that scrapes the title, artist, and album from a given Rdio playlist. I’ve had little experience with bookmarklets, but I hacked away at it. My version outputs the playlist into YAML. It also grabs the playlist title, image, and link to the playlist on Rdio.\n\nAt this time, I need to make sure that the entire playlist is loaded and that I open the “Share” modal, otherwise the bookmarklet won’t find those values. I’ll make the bookmarklet sweet on a rainy day, but for now it works despite the conditions.\n\n\n\nRdio playlist to YAML bookmarklet\n\nIt felt great to get my playlists under one roof. It felt even better to figure out how to use data files in Jekyll.\n",
  tags: ["Jekyll","playlists","Rdio","PHP"],
  id: 96
});
index.add({
  title: "2013/2014 Winter",
  category: "playlists",
  content: "\n",
  tags: [],
  id: 97
});
index.add({
  title: "Dots",
  category: "code",
  content: "See the Pen Dots by Katy DeCorah (@katydecorah) on CodePen.\n\nThe other day I came across the Dribbble shot Cross by Helvetic Brands. I loved the pixels and the animation, so I started to code it out. I used a single element to create the first pixel and then used box-shadow to generate the rest. I started to add the animation, but I spun myself in another direction.\n\nI cloned the box-shadow, creating two sets of dots and had the pair square dancing, as seen above.\n\n1 dot + box-shadow = 16 dots\n\nWith the single element, .dot, I used its pseudo elements to house each set of dots. The actual element serves as container. The width and height of the element adjusts to the $size of the dots, the number of $dots, and the number of dot $rows.\n\nEach pseudo element creates the first initial dot, the upper-most, left-most dot. The dot sets the precedent for the box-shadow dots using $size.\n\nI used box-shadow to spin out 4 rows and 4 columns of dots. I admit that I first wrote out the shadow values by hand (more on that later). Instead of assigning the color value of the box-shadow, I used the color property within each pseudo element to control the color.\n\nNegative Delays\n\nI created an animation cross that translates the pseudo elements around a rigid square (down, right, up, left). At first I calculated the translate values by hand. Then I figured out how to replace the values with a variable using $size to make the animation scalable.\n\nanimation: cross 2s infinite ease-in;\n\nI created a second animation criss to apply to the second pseudo element. Then I remembered that I had seen that you can use a negative value on the animation-delay to give the animation a head start. I nixed the criss animation, duplicated the original rule, and added a negative delay.\n\nanimation: cross 2s infinite ease-in -1s;\n\nSquare dancing dots!\n\ndotMama: The Sass Function\n\nI had the project finished, but I wanted to optimize my code.\n\nI sent myself on a mission to write a Sass function to output the box-shadow values. I had never written a Sass function before, but I found a post about creating Sassy Text Shadows by Adam Stacoviak. I borrowed the bones of the function and started hacking at it.\n\nEven though my function needed to loop through a small set of value, I started to confuse myself. I kept getting in my head about it. Maybe it was the complex function I was altering or the fact that I was playing with a new syntax. Whatever the reason, I decided to switch languages for a hot minute.\n\nI thought to my myself, “How would I write this at work?” I am limited to ColdFusion at work. Yeah, it’s not sexy, but its the language that I’m currently pounding away at daily, thus it’s freshest in my mind.\n\nWithin a couple minutes, I wrote the following loop in ColdFusion using absolute values:\n\n&lt;cfset x = 0&gt;&lt;cfset y = 0&gt;&lt;cfset max = 16&gt;&lt;cfset row = 4&gt;&lt;ol&gt;&lt;cfloop from=\"1\" to=\"#max#\" index=\"i\"&gt;&lt;li&gt;#x#em #y#em 0&lt;/li&gt;&lt;cfset y = y + 3&gt;&lt;cfif i % row eq 0&gt;&lt;cfset x = x + 3&gt;&lt;cfset y = 0&gt;&lt;/cfif&gt;&lt;/cfloop&gt;&lt;/ol&gt;\n\nNext, I translated the ColdFusion to Sass and added in my relative values.\n\n@function dotMama($max,$r,$x,$y) {  $output: '';  @for $i from 1 through $max {    $output: $output + '#{$x} #{$y} 0';     @if $i &lt; $max {       $output: $output + ', ';     }    $y: $y + ($size * 2);    @if $i % $r == 0 {      $y: 0;      $x: $x + ($size * 2);    }  }  @return unquote($output);}\n\nI am the proud creator of the Sass function, dotMama.\n\n(p.s. holy hell, I used modulus!)\n\nPlay, please\n\nI tried my darndest to make this whole project scalable. Try changing the $dots and $rows in the Sass. You will find that the dots do a great job of following your orders.\n\n\nSee the Pen Dots by Katy DeCorah (@katydecorah) on CodePen.\n\n\nSee the Pen Dots by Katy DeCorah (@katydecorah) on CodePen.\n\n\n",
  tags: ["CodePen","Sass","box-shadow","single element"],
  id: 98
});
index.add({
  title: "The East Wing Episode 86",
  category: "code",
  content: "I had a nice time chatting with Chris Enns on the East Wing!\n\n\n  Chris Enns fills in again for Tim Smith and he chats with Katy DeCorah about how she got her start on the web, how her education in history and library helps with research, and what it’s like developing for IE 7 in 2014.\n\n\n\n\nUnfortunately, the link to the recording no longer works.\n",
  tags: ["time travel","podcasts"],
  id: 99
});
index.add({
  title: "Leadership Letters by Jeroen van Eerden",
  category: "code",
  content: "\nSee the Pen Leadership Letters #2. by Jeroen van Eerden by Katy DeCorah (@katydecorah) on CodePen.\nLeadership Letters #2. by Jeroen van Eerden\n\n\nI recreated Leadership Letters #2. by Jeroen van Eerden using Hugo Giraudel’s items in a circle Sass mixin and generous use of the border property.\n\nBorder control\n\nThe project has eight block elements, .item, nested in a container. Each .item is supposed to resemble the letter ‘L’. (In my first commit I totally wrote that it was the number ‘7’, re: title.) To get the shape, I assigned the top and right border-color colors, while I gave the bottom and left border-color transparent values.\n\n\nSee the Pen Leadership Letters demo 1 by Katy DeCorah (@katydecorah) on CodePen.\nCreating the shape with border\n\n\nAt first, I didn’t use the bottom or left borders at all. Instead, I used box-shadow to cast a white lip around the broadside of each element providing space between each .item. By doing that I had to increment the z-index to keep each element’s noise underneath the previous. Unfortunately, the first element in the z-index stack was then on top of the last element. I scratched my head for a while, until I removed the box-shadow and clipped each element’s nose with a transparent left border.\n\nTwo cheers for simple code.\n\nCircling\n\nNext, I needed to get each .item on a circle and rotated about 45 degrees to achieve the cascading effect. I tweaked the items on a circle mixin until each element fell into place. I’ve used the mixin before, but I must not have examined the code. I didn’t realize that you can assign more than one rotate values in one transform rule. (I learned something new today /air guitar/).\n\ntransform: rotate(0deg) translate(0.875em) rotate(45deg);\n\nUsing the two rotates, I balanced out the items onto the circle and then locked them into position.\n\n:nth-of-what\n\nI used :nth-of-type to alternate the colors of my Sass list, $colors. I thought I had the :nth selector game figured out, but it took me a few tries to alternate the colors among the items.\n\n:nth-of-type(4n + 2):nth-of-type(4n + 3):nth-of-type(4n + 4)\n\nThe above will then compute as:\n\n\n  4 (0) + 2 = 2, 4 (1) + 2 = 6\n  4 (0) + 3 = 3, 4 (1) + 3 = 7\n  4 (0) + 4 = 4, 4 (1) + 4 = 8\n\n\n(I think that this makes sense to me. Hi, I’m insecure about :nth.)\n\nThe first and fifth elements take the initial style from .item.\n\nBorder animation\n\nOnce I had the project built out, I started playing around with a few of the properties. I found that by increasing the border-bottom-width each element would appear to tuck its tail in, which created a beautiful inner circle. I added an animation to bounce from sharp edges to smooth edges to capture all the shapes.\n",
  tags: ["CodePen","Haml","Sass","animation","Dribbble"],
  id: 100
});
index.add({
  title: "Slidey background",
  category: "code",
  content: "See the Pen Slidey Background by Katy DeCorah (@katydecorah) on CodePen.\n\nEach box above is an anchor tag with a linear-gradient. On hover, the background-position changes to reveal the second half of the link’s gradient.\n\nCreating the gradient\n\nI created an even gradient for each link where the lighter color ends at 50% and the darker color starts at 50%. The gradient doesn’t repeat, but it’s twice it’s size on either the x or y axis. For example, the up (↑) link has background-size: 100% 200%. Unless I change the background-position, then the second half of the gradient will remain hidden because it’s clipped by the size of the element.\n\n\nSee the Pen Slidey Background: Demo 1 by Katy DeCorah (@katydecorah) on CodePen.\nDemonstration of the gradient\n\n\nThe demo above illustrates:\n\n\n  The actual size of the gradient.\n  The size of the element clips the gradient to reveal the first half of the gradient.\n  Changing the background-position pulls the second half of the gradient into view.\n\n\nHover\n\nOn hover, I set the background-position to move 100% on the same axis that I doubled in size. For the up (↑) link, the rule is background-position: 0 100%;. The new position paired with a transition pulls the second half of the gradient into view.\n\nFat lip\n\nDid you notice the lip of the darker gradient peaking in? The lip is adjustable on $start. Try changing the value. If the variable is 0, then the lip of the second half of the gradient disappears.\n\nThoughts\nI love the sliding between the left (←) and right (→) links. It appears that they are both tugging at the same rectangle. I’ll have to hold onto this idea.\n",
  tags: ["CodePen","Haml","Sass","gradient"],
  id: 101
});
index.add({
  title: "Homemade Ice Cream",
  category: "epicurean",
  content: "\n\nHomemade Coffee Ice Cream\n\n\nI am a novice ice cream maker. My qualifications include: loving the taste of ice cream.\n\nI’ve started to develop a favorite ice cream recipe that I adapted from Key Lime Ice Cream. In my limited experience, I’ve found that some recipes will produce an icy tasting ice cream, but this recipe keeps it smooth and creamy.\n\nThe mixins section contains examples of different flavors that I’ve tried. I recommend researching other recipes to learn how to integrate other flavorful ingredients.\n\nThe recipe yields two pints.\n\nIngredients\n\n\n  2 large eggs\n  4 egg yolks\n  1 ¼ cups white sugar\n  2 ¼ cups heavy cream\n\n\nMixins\n\nFor key lime:\n\n\n  1 T lemon zest\n  ¾ cup lime juice\n\n\nFor coffee:\n\n\n  2 T instant coffee grounds\n\n\nDirections\n\n\n  Whisk together the eggs, egg yolks, sugar, and mixins in a saucepan over medium heat until well-blended.\n  Continuously stir the egg mixture with a wooden spoon until thickened, 7 to 8 minutes. The mixture should be thick enough to coat the back of the spoon. (If you have a thermometer the mixture should reach about 170°F.)\n  Remove the mixture from heat and stir in the heavy cream until smooth.\n  Strain the mixture through a fine sieve set over a clean bowl.\n  Cover and chill the mixture in the refrigerator, stirring occasionally until cool, about 1 hour.\n  Pour the chilled mixture into an ice cream maker and freeze according to manufacturer’s directions, 10 to 15 minutes. The consistency should be like a milkshake.\n  Transfer ice cream to a lidded container and cover the surface with plastic wrap and seal.\n  Freeze for at least 2 hours or overnight.\n\n\nRecommendations\n\nI use these pint containers. The containers are great, especially for giving ice cream as gifts.\n\nI store the pint containers in a freezer bag, I find that it helps keep the ice cream from getting freezer burnt.\n\nFor extracting egg yolks, I will crack the egg into a clean hand over the sink. I will coddle the yolk, but allow the egg whites to slip through my fingers.\n\nWhen making coffee ice cream, you might want to consider decaf if you intend on eating ice cream before bed. (I’m a caffiene wuss, so the coffee ice cream had me buzzing.)\n",
  tags: ["treats","recipe"],
  id: 102
});
index.add({
  title: "Washington DC",
  category: "adventures",
  content: "I spent an awesome week in DC.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  tags: ["Mapbox","travel","yay"],
  id: 103
});
index.add({
  title: "calc(you + me)",
  category: "code",
  content: "See the Pen calc(you + me) by Katy DeCorah (@katydecorah) on CodePen.\n\nEvery Valentine’s Day, I like to make my boyfriend a mushy, gushy, hand-coded card.\n\nIt’s made straight from the &amp;#9829;.\n",
  tags: ["CodePen","transform","animation","Sass","yay"],
  id: 104
});
index.add({
  title: "THREES App Store Button",
  category: "code",
  content: "See the Pen THREES App Store Button by Katy DeCorah (@katydecorah) on CodePen.\n\nI recently came across the website for the app THREES. One of my favorite parts of the website is at the very bottom. As you scroll, the phone glides down the page and ends up in a pocket, where an app store button awaits you.\n\nI loved the button and decided to give it a spin in CSS. The demo above is scalable on $size and color change friendly on $btn.\n\nThe dimension of the button and button’s shadow are created through box-shadow.\n\nRelated: I’m addicted to THREES.\n",
  tags: ["CodePen","box-shadow","Sass"],
  id: 105
});
index.add({
  title: "Wells Weekend",
  category: "adventures",
  content: "This weekend we celebrated my birthday in a cabin in Wells, NY.\n\nI read a book, we watched movies, we cooked, and we hiked.\n\n\n\n\n\n\n\nI made an apple dutch baby.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nWe had an awesome lunch at the Timberline Cafe in Speculator.\n\n\n\n\n\n\nI loved this weekend!\n\np.s. Airbnb never fails!\n",
  tags: ["yay","fresh air","birthdays","treats"],
  id: 106
});
index.add({
  title: "Power Up Preloader by Mantas Ba&#269;iu&#353;ka",
  category: "code",
  content: "See the Pen Power Up Preloader (GIF) by Mantas Bačiuška by Katy DeCorah (@katydecorah) on CodePen.\n\nI created another scalable, chameleon, single element project. This is based off of the Dribbble shot, Power Up Preloader by Mantas Bačiuška.\n\nHover over the battery for LIGHTNING CHARGE (please flick your lights on and off as you read this sentence).\n\nElements\n\nThe main element, .battery, is the outline of the battery. The :before is the inner animating gradient and the :after is the battery contact.\n\n\nSee the Pen Power Up Preloader - deconstructed by Katy DeCorah (@katydecorah) on CodePen.\nDemonstration of elements.\n\n\nYou best customize\n\nLike my previous Pens, I also made this one scalable. Try changing $size in the Sass. I added a few conditions for when $size is less than 4em, because when $size is teeny the positioning gets thrown off. To help it along, I added a background-color to .battery to hide the pixel off-ness.\n\nThe color of the battery and background will adjust according to $accent. Darkish grays look pretty dope.\n\nRepeating gradients repeating gradients\n\nThe magic of this whole thing is the animated gradient. The first step was creating a gradient that was a pattern. The beginning and end must match seamlessly. I carefully crafted (jk, I guessed until I got it right) the repeating-linear-gradient into a pattern.\n\nbackground: repeating-linear-gradient(-45deg, $bg, $bg 3%, $accent 3%, $accent 25%);\n\n\n\nSee the Pen Power Up Preloader -- swatch by Katy DeCorah (@katydecorah) on CodePen.\nDemonstration of gradient\n\n\nThe animation moves the background-position of the gradient horizontally. In @keyframes I set to {background-position:(($size /2) - $border) 0;}. I used a variable here so that the gradient stays in proportion.\n\nI coupled the @keyframes with animation: charge 0.5s infinite linear; on :before. Once the background-position gets to (($size /2) - $border) it runs again, but it’s seamless so we can’t tell.\n\nIt took me a few tries to get the repeating-linear-gradient just right. Gradients are so useful, but dang… I need to spend more time with them. For instance, I didn’t know until about a month ago that the repeating function existed for linear and radial.\n\nI think I’ll need to do some more experiments with gradients.\n",
  tags: ["Dribbble","CodePen","Sass","single element","gradient"],
  id: 107
});
index.add({
  title: "Mapbox for Jekyll posts",
  category: "code",
  content: "As of 7/26/2014, this site has moved to the Mapbox static API.\n\nA few months ago, I began playing around with the Google Static Maps API. I integrated it with my Static Google Maps Image for Jekyll Posts and created a Static Map Maker.\n\nSince then, the Google maps have worked great with my posts. All I need to do is add locations to my front-matter and Jekyll logic handles the rest. It was sometimes annoying having to fiddle with the zoom to make all of the map markers fit on the map, but other than that Google maps worked.\n\nI started playing with the Mapbox API this weekend. The API has so many features that I started a wish list for my posts with maps:\n\n\n  full width map\n  automatically fit markers to map\n  customize the overall look and feel\n\n\nI decided to roll Mapbox into my site, much like I did with Google maps.\n\nStarting out\n\nAfter skimming through the Mapbox.js examples, I knew that I wanted to focus on the Fit Map to Markers example. In this example, the markers are saved as GeoJSON and then that data is loaded into the marker layer. However, I want to define my locations in the front-matter of my Jekyll post, not create a GeoJSON file. To make this happen, I needed to find a way to define my locations in the flesh.\n\nI clicked around the examples, until I found what I was looking for in Load GeoJSON example. This example uses the variable geojson to hold all of the map marker data.\n\nMy next step was to marry the two examples:\n\nvar map = L.mapbox.map('map', 'katydecorah.h41bj3lj'),   geoJson = [      {        \"type\":\"FeatureCollection\",        \"features\":[          {            \"type\":\"Feature\",            \"properties\":{              \"title\":\"DC\",              \"marker-color\":\"#2A2B26\"            },            \"geometry\":{              \"type\":\"Point\",              \"coordinates\":[                -77.03887939453125,                38.89530825492018              ]            }          }        ]      }    ],   markerLayer = L.mapbox.markerLayer().setGeoJSON(geoJson).addTo(map);map.fitBounds(markerLayer.getBounds());\n\nIt worked!\n\n\nSee the Pen Mapbox -- Testing by Katy DeCorah (@katydecorah) on CodePen.\nDemonstration with multiple locations.\n\n\nJekyll and Mapbox\nNow that I had the map working, I was confident that I could integrate Mapbox into my Jekyll posts.\n\nIn the front-matter of this post, I added locations, just like I have done in previous posts to generate a Google map (I’m using coordinates until I have time to crack geocoding). I added a new flag to this post, mapType: Mapbox, which will let Jekyll know that I want to use Mapbox and not Google maps.\n\nThe following is currently in this page’s front-matter to generate the map:\n\nmapType: Mapboxlocations: - \"-73.7629483,42.6539068\" - \"-73.7254484,43.2440284\" - \"-82.5525523,35.5908429\"\n\nSince I’m still exploring and learning the Mapbox API, I’m not 100% ready to break up with Google maps on my posts. For now I will allow Google maps on previous posts, but I will use the flag to let Jekyll know when to use Mapbox.\n\nI altered my Google map code to consider the new Mapbox flag:\n\n{% if page.locations %}&lt;div{% if page.mapType %} id=\"map\"{% endif %} class=\"post-map-header\"&gt;\t{% if page.mapType %}{% else %}\t&lt;img src=\"http://maps.googleapis.com/maps/api/staticmap?{% for location in page.locations %}{% if forloop.first %}center={{location | replace:' ','+' }}&amp;amp;markers=color:blue%7C{{location | replace:' ','+' }}{% else %}&amp;amp;markers=color:blue%7C{{location | replace:' ','+' }}{% endif %}{% endfor %}&amp;amp;zoom={% if page.zoom %}{{page.zoom}}{% else %}13{% endif %}&amp;amp;size=1280x180&amp;amp;scale=2&amp;amp;sensor=false&amp;amp;visual_refresh=true\" class=\"post-location-image\" alt=\"untitled\"&gt;\t{% endif %}&lt;/div&gt;{% endif %}\n\nIf the post has mapType, then Jekyll will add id=\"map\" and it will not load the Google map. For this page, which has mapeType, the logic above will output:\n\n&lt;div id=\"map\" class=\"post-map-header\"&gt;&lt;/div&gt;\n\nIn my end.html include, that wraps up every post and page, I added a new include, mapbox.html. This include contains the following logic:\n\n{% if page.mapType %}&lt;link href='//api.tiles.mapbox.com/mapbox.js/v1.6.1/mapbox.css' rel='stylesheet' /&gt;&lt;script src='//api.tiles.mapbox.com/mapbox.js/v1.6.1/mapbox.js'&gt;&lt;/script&gt;&lt;script&gt;var geoJson = [{\"type\":\"FeatureCollection\",\"features\":[{% for location in page.locations %}{\"type\":\"Feature\",\"properties\":{\"marker-color\":\"#2A2B26\"},\"geometry\":{\"type\":\"Point\",\"coordinates\":[{{location}}]}}{% if forloop.last == false %},{% endif %}{% endfor %}]}],map = L.mapbox.map('map', 'katydecorah.h41bj3lj',{zoomControl: false}),markerLayer = L.mapbox.markerLayer().setGeoJSON(geoJson).addTo(map);map.fitBounds(markerLayer.getBounds());map.dragging.disable();map.touchZoom.disable();map.doubleClickZoom.disable();map.scrollWheelZoom.disable();if (map.tap) map.tap.disable();&lt;/script&gt;{% endif %}\n\nIf the page has mapType, then it will load Mapbox and create the geoJson variable. The geoJson variable is constructed using a loop on the current page locations.\n\nFinalizing\n\nI decided to disable dragging and zooming because for posts, the map is more supplemental and for context. I didn’t want my visitors to get lost in a scroll. I also overrode the cursor: move  on .leaflet-container,.leaflet-clickable to default to not confuse visitors since the dragging and zooming is disabled.\n\nI added opacity to .leaflet-tile-pane to allow the map to slightly recede.\n\nI added an animation to the .leaflet-marker-icon to allow the map markers to glide onto the map. I love how the tiles transition in and I wanted to see if I could push it a little further.\n\nI didn’t do too much to customize the look and feel of the map, but I definitely plan on growing into it.\n\nGeocoding\n\nIt wasn’t until after I finished all of this, that I found the Initially Position Map with Geocode example. I had assumed that I would need to collect the coordinates for the locations, instead of using a string. I studied the example and played around with it for a while. I was able to set the bounds of a map based on an array, but I just didn’t have the time to figure out adding map markers. I will have to return to this later, because string locations are much easier to work with when creating posts on the fly. Plus, it would give me the opportunity to roll Mapbox into my past posts.\n\nConclusions\n\nI realize this might not be a typical use case for Mapbox, considering that I pretty much neutered the map into a static map. Nevertheless, I love automating features and it was still cool to figure out. I’m excited to develop this feature more into my posts.\n\nMapbox produces gorgeous maps and has great documentation to help you show them off.\n",
  tags: ["maps","API","Jekyll","JavaScript","Mapbox"],
  id: 108
});
index.add({
  title: "I cut my hair",
  category: "notes",
  content: "\n\n\n\n\nI’m sending about 11 inches to Pantene Beautiful Lengths!\n",
  tags: ["yay","time travel"],
  id: 109
});
index.add({
  title: "Escape by Carla Corrales",
  category: "code",
  content: "See the Pen Escape by Carla Corrales by Katy DeCorah (@katydecorah) on CodePen.\n\nI have another single element project! I explored the Dribbble shot Escape by Carla Corrales.\n\n.marker\nThe main element, .marker, is the map marker shape. The :before is the inner circles and the :after is the dial.\n\n\n\nI created the marker shape by using a border-radius: 100% 100% 0;. Then I rotated the element 45 degrees, making it sit on its point. I used a linear gradient for the two-toned look of the background.\n\n\nSee the Pen Escape -- Observe 1 by Katy DeCorah (@katydecorah) on CodePen.\nDemonstration of map marker style.\n\n\n:before\n\nI used the :before element for the inner background. I created the inner rings by using two gradients, linear and radial. Initially I used inset box-shadow to create the rings, but I lost a section of the two-toned background. Layering the radial gradient on top of the linear gradient worked better in this case and gave me a reason to tinker with gradients.\n\nBelow is a demonstration of the linear and radial gradients coming together.\n\n\nSee the Pen Escape -- :before -- demonstration by Katy DeCorah (@katydecorah) on CodePen.\nDemonstration of linear and radial gradients.\n\n\n:after\nI used the :after element for the dial. First, I created a rectangle using border. I used border because the dial is four-toned and I can set each border side to a different color. Next, I skewed and rotated the element. I skewed it until I squashed the height and elongated the width.\n\nThe results were… dial-shaped!\n\n\nSee the Pen Escape -- :after -- demonstration by Katy DeCorah (@katydecorah) on CodePen.\nDemonstration of :after style.\n\n\nThis baby is scalable. Open it up in CodePen and change the $size (easter egg: try a number less than 5em).\n\nOne last thing, did you give it a hover yet? Scroll back up there and do it. Yes, I am bossing you.\n\nUpdated 01/18/2014\n\nI wanted to give this Pen a little more pizazz by making the dial spin immediately and then spin again on hover. To make this happen, I needed to trade in my transition for animation, but more importantly, I needed to learn more about animation-play-state. I had never thought to use this property until I read Lea Verou’s, Smooth state animations with animation-play-state.\n\nStarting out, I added the animation to .marker:after and I added animation-play-state to .marker:hover:after. I wanted the animation to play and then play again on :hover. After trying out all of the values and combinations of values, I finally began to understand this property. I like to think about animation-play-state like watching a movie and the remote is my :hover target.\n\n animation-play-state: running;\n\nFor my first try, I used the value running. Nothing happened. The animation was already running and then on :hover, I asked it to run again.\n\nIf I’m watching a movie and press play then my action won’t be productive.\n\n animation-play-state: paused;\n\nNext, I tried the alternate value, paused. It kind of worked. The animation didn’t play when I was hovering, but it played once I hovered off of the target.\n\nIf I’m watching a movie and I press pause, the movie will pause. I’m guessing that the animation restarted because it triggered the original animation on .marker:after to run again. (I need to look into this.)\n\n  animation-play-state: paused, running;\n\nA little confused with my previous tries, I checked out MDN. I read that both values can be used, which led me to try paused, running. This value worked great! The dial spun on :hover.\n\nI was watching a movie, I paused it and then played it again.\n\nThis example might be a little stilted; I definitely plan on exploring animation-play-state more!\n",
  tags: ["Dribbble","CodePen","Sass","single element","animation"],
  id: 110
});
index.add({
  title: "Dean Farm Heritage Trail",
  category: "adventures",
  content: "Today my folks and I explored the Dean Farm Heritage Trail in Stony Creek. The trail was fairly easy to navigate as it was marked with wooden poles. We were impressed by all of the beautiful bridges, benches, and overlook points.\n\n\n\n\n\n\n\n\n\nThe creek was buzzing.\n\n\n\n\n\n\n\n\n\n\n\nI really enjoyed this trail and I cannot wait to go back to see it in the spring.\n",
  tags: ["family","hiking","fresh air","recommended"],
  id: 111
});
index.add({
  title: "The Cheers Sweatshirt",
  category: "notes",
  content: "\n\n\n\nI received so many wonderful gifts this past Christmas, but one stands out.\n\nEarly last year I started watching Cheers on Netflix. Soon my sister started watching and then it became a show my boyfriend and I watched together. We all loved Cheers and being able to share it with our parents.\n\nWhen my sister was home for summer, my parents were finishing their wills and they asked if we wanted any particular possessions. To break the somber tone, I requested mom’s Cheers sweatshirt.\n\nMom bought the sweatshirt at a rest stop on a trip home from Boston in the early 90s. It is dark blue, has a small bleach stain, is incredibly soft, and it was currently in my sister’s possession. She wasn’t planning on giving it up. We spent the following months playfully bickering over the sweatshirt.\n\nOn Christmas Eve, my sister handed me a box. The tag read, “Consider this a truce.” I opened the box and there it was — the Cheers sweatshirt. As I stared at it, I realized that I didn’t want to take it from her. I told her that she shouldn’t have given it to me, but she said she didn’t. She found this one on eBay.\n\nI had a nice laugh, but we were all laughing when we found out that mom also got all of us Cheers sweatshirts.\n\nIt was 2013 and I received two Cheers sweatshirts for Christmas.\n",
  tags: ["family"],
  id: 112
});
index.add({
  title: "Flat icon by _Bosco",
  category: "code",
  content: "See the Pen Flat icon by _Bosco by Katy DeCorah (@katydecorah) on CodePen\n\nI recreated the Dribbble shot Flat icon by Bosco.\n\nEach award is a single element (.award) that uses additional classes to decide the color (.gold, .silver, or .bronze) and the type (.badge or .ribbon). These additional classes allow for mix and matching of the colors and award types. The award is scalable based on font-size. Try changing the $fontSize in the Sass to see the scaling powers. Please note that the awards are so adorable when the value is small.\n\nWhile $fontSize controls the size of the number and ultimately adjusts the size of the element (all ems all errrthang), $size dictates the actual size of the award around the number. Try adjusting $size in the Sass to change the proportion of the award to the number.\n\nThe awards are all styled the same, but .ribbon and .badge provide different styles for the pseudo elements. I dreamt up the ribbon tails for .ribbon quickly. I manipulated the border by styling a transparent border-bottom-color, which created two triangles for the ribbon tails. I added height to the element to elongate it into a ribbon. I created one tail out of each pseudo element.\n\n\n\nI started to sweat a little while creating the badge. I didn’t think I had enough pseudo elements to achieve what looks like a hexagon. In the end, I managed to skimp on a side. I created a rectangle out of the :before and used a horizontal gradient to create the three stripes. Then I created a triangle out of the :after, but kept it solid colored. Luckily the medallion fit nice and snug up where the triangle and rectangle met.\n\n\n\nCan you tell that I got an iPad for Christmas?\n",
  tags: ["Dribbble","CodePen","Haml","Sass","single element"],
  id: 113
});
index.add({
  title: "Baking in the New Year",
  category: "epicurean",
  content: "\n\n \n\n\nIt took several hours, but my oh my… worth it.\n\nCinnamon swirl buns recipe by Smitten Kitchen\n",
  tags: ["treats"],
  id: 114
});
index.add({
  title: "z-index and transform",
  category: "code",
  content: "See the Pen END by Catt by Katy DeCorah (@katydecorah) on CodePen\n\nI knew that I wanted to code out the Dribbble shot END by Catt as a single element. I planned on using the main element for the text and pseudo elements to create the tails of the ribbon.\n\n\n\nIn making all of this happen, I was presented with of couple challenges.\n\n\n  Give the ribbon tail a shadow without adding extra elements.\n  Preserve the stacking order on transform.\n\n\nGive the ribbon tail a shadow\n\nFirst, I created a triangle by manipulating the border properties to recreate the shadow effect of the ribbon. It worked, but it didn’t match up perfectly.\n\n\n\n\nAnd then, it came to me… a trapezoid!\n\n\n\n\nThe trapezoid fit perfectly. I also used a variable $ribbonSize to keep the ribbon tails in proportion with the shadow. In doing so, the ribbon became scalable!\n\nPreserve the stacking order on transform\n\nPrior to this project, I noticed issues in preserving the stacking order, z-index, of elements once a transform is introduced. Until now, I didn’t know how to remedy it, so I avoided it.\n\nOnce I added transform to the main element, the pseudo elements appeared to disregard the z-index: -1 rule and sat on top of the main element.\n\n\n\nThrough research, I dove into the situation of what takes place between stacking orders and transforms. I learned that once transformed, an element needs to play by 3D rules. Without specifying the transform-style, I was technically still in flat mode.\n\n\n  If flattened, the children will not exist on their own in the 3D-space.\n– transform-style by MDN\n\n\nTo allow the children to exist on their own, I needed to pepper in a couple more properties. First, I told my main element to preserve-3d.\n\n.ribbon {\t...\ttransform-style: preserve-3d;}\n\nNext, I controlled the stacking order of the pseudo elements through translateZ. Think of translateZ as the 3D version of z-index.\n\n.ribbon {\t...\ttransform-style: preserve-3d;}.ribbon:before, .ribbon:after {\t...\ttransform: translateZ(-1em);}\n\nAfter adding these properties, my ribbon tails popped back into place behind the ribbon.\n\nBelow is a playground I created to test translateZ.\n\nSee the Pen z-index &amp; transform by Katy DeCorah (@katydecorah) on CodePen\n",
  tags: ["Dribbble","CodePen","Haml","Sass","single element"],
  id: 115
});
index.add({
  title: "Food by nos",
  category: "code",
  content: "See the Pen Food by nos by Katy DeCorah (@katydecorah) on CodePen\n\nAbove is the Dribbble shot, Food by nos, that I coded out and added some hover pizazz.\n\nIn this example, I tried to play around with flexbox. Things didn’t go as expected in Firefox; I couldn’t get box-pack to center vertically. I’ll have to experiment some more to get the hang of it.\n",
  tags: ["Sass","Haml","Font Awesome","CodePen","Dribbble"],
  id: 116
});
index.add({
  title: "2013 Fall",
  category: "playlists",
  content: "\n",
  tags: [],
  id: 117
});
index.add({
  title: "Holiday tree(s)",
  category: "code",
  content: "See the Pen Holiday tree(s) by Katy DeCorah (@katydecorah) on CodePen\n\nI whipped up a little animation in honor of the holidays.\n\nI got the idea from a card I saw on Pinterest made by cut&amp;make. The card is two-toned, white on the outside and green inside. Each triangle is cut out, except for the bottom which folds out.\n",
  tags: ["Haml","Sass","CodePen","holiday cheer"],
  id: 118
});
index.add({
  title: "Holiday Treats",
  category: "epicurean",
  content: "I’ve been baking.\n\n\n\n\n\nRum balls.\n\n\n \n\n\nChocolate dipped pretzel rods. Double chunk peppermint cookies.\n\nThere will be more. Pinky promise.\n",
  tags: ["treats","yay","holiday cheer"],
  id: 119
});
index.add({
  title: "Animation direction",
  category: "code",
  content: "See the Pen Animation Direction by Katy DeCorah (@katydecorah) on CodePen\n\nI never fully understood the values of animation-direction, the property that tells the animation in which direction to play. It’s difficult to differentiate between normal, reverse, alternate, and alternate-reverse without a visiual reference. I created the animation above to demonstrate all of the values of animation-direction.\n\nEach set of dots performs the same animation, but in a different direction. You can see the animation run infinitely on CodePen.\n\nRead more about animation-direction\n",
  tags: ["CodePen","animation","Sass","Haml"],
  id: 120
});
index.add({
  title: "Heroes Queue by Antonas Deduchovas",
  category: "code",
  content: "See the Pen Heroes Queue by Antonas Deduchovas by Katy DeCorah (@katydecorah) on CodePen\n\nI love trying to find different ways to get a job done. Especially when it means using a certain piece of technology in an unexpected way. Maybe the job is silly, but it’s the problem solving that I really, truly dig.\n\nAt first glance, I knew I wanted to somehow play around with the Dribbble shot Heroes Queue by Antonas Deduchovas and I was definitely thinking single element for each character, but with tons of box-shadow. However, I also knew that I didn’t want to do the grunt work. So I opened up a spreadsheet in Google Drive.\n\nGoogle spreadsheets to the rescue\nIn a new spreadsheet, I resized the rows and columns to 25 and turned word text off. Now I had a grid, unscathed by lengthy text. I opened the shot in Photoshop and added a grid to closely match each bit of the image.\n\nFormat &gt; Conditional formatting\nBefore this project, I had known about a cool feature in Google Spreadsheets, conditional formatting. You can set conditions in the spreadsheet to style a cell based on a string or digit. If there is a match then the background color or font color of that cell will change according to your rule.\n\n\n\nVariables as conditions\nI set up my color variables as conditional formatting. For example, in any cell that had $bg, the condition called for that cell to be the background color I selected. I added more rules for other variables such as $red, $face, and $shirt. This step isn’t necessary, but it improves the experience.\n\nWriting out the characters\nWith one eye in Photoshop and another in Google Drive, I started typing my variables into the spreadsheet. As I entered a variable that matched a condition, the background instantly changed. It only took a few minutes to assign a color variable to each cell. Plus, spreadsheets allow for mass select and paste, it was a snap.\n\nI ended up creating each character on  a 26×26 grid or in spreadsheet terms A1:Z26. This grid size came in handy later when concocting the formula.\n\n\n\nYou might notice that I didn’t need to include $bg. I could have left those cells blank, because in the end I’m just going to ignore those cells because the body background can make up for it. I’m a visual person, so  putting those values in worked for me.\n\narrayFormula()\nOnce I had the character ready, it was time for formula magic to output my box-shadow values.\n\n=ArrayFormula(if(A1:Z26&lt;&gt;\"$bg\",\"(\"&amp;column(A1:Z1) -1 &amp;\" * $width) (\" &amp; ROW(A1:Z26) -1  &amp;\" * $width) 0 0 \"&amp;A1:Z26&amp;\",\",\"\"))\n\n\nI entered this formula in the first cell after the last column, AA:1. This formula went through A1:Z26 and transposed all of the cell data, but I carefully defined the output so that each cell declares its own box-shadow value.\n\nThe formula does the following:\n\n  If any cell within A1:Z26 doesn’t equal “$bg”, then reformat the cell, but if it does then do “” (create a blank cell — so yes, the variable is superfluous as previously stated).\n  To reformat the cell, as seen in the second set of double quotes, each permitted cell generates the following box-shadow values &lt;offset-x&gt; &lt;offset-y&gt; &lt;blur-radius&gt; &lt;color&gt;,. Each cell dynamically adjusts the offset-x and offset-y values of the shadow according to its position in the spreadsheet. I set the blur-radius to 0 and used the existing cell data for the color of the shadow.\n\n\nInitially, I had used static values, for example: 9em 0em 0 $red,, but that meant I couldn’t scale the character because this was based on 1em. Instead, I made the values relative: (9 * $width) (0 * $width) 0 $red,. Now whenever I adjust the $width the character will stay in perfect proportion.\n\nGimme all the box-shadows\nOnce I entered the formula into cell AA:1, the character was automatically transposed into box-shadow values. From there I selected all AA1:AZ26 cells, copied, and pasted as the value of box-shadow: into my CSS. And done!\n\nFeel free to check out the spreadsheet that I used to create these characters.\n\n(I highlighted AA1 to indicate that that cell holds the formula.)\n\n\n\nWhen I pasted the code it had some undesirable spaces and returns, but I quickly regex replaced that sucker into a dreamy column.\n\n\n\nPhat code\nThis code is heavy. So heavy. I know it’s irresponsible for every day wear, but it’s fun and this is one of my favorite ways to learn new things. I spend my work days creating web-based trainings that must be pristine in IE7. For that reason, I crave projects that push boundaries.\n\np.s.\nI tried to get the same animation in the Dribbble shot with the characters bouncing up and down. Unfortunately, the animation didn’t take too kindly to all the values. It rendered a trippy, slapping of box-shadows, that was sure to melt a computer into liquid, Alex Mack style. I settled with a hover, so did you hover?\n",
  tags: ["CodePen","Dribbble","Sass","box-shadow"],
  id: 121
});
index.add({
  title: "Simple box",
  category: "code",
  content: "See the Pen Simple Box by Katy DeCorah (@katydecorah) on CodePen\n\nThe .box is a single element. I used the transform property and pseudo elements to achieve the result.\n\nThe main element is the top of the box. Initially, I made the main element the left side of the box. I think that was knee-jerk reaction for wanting to move left to right. However, styling this box is much easier when the main element is the top. The top will serve as an important reference point for the remaining sides of the box.\n\nI started by drawing out a square and then rotating it 45 degrees and skewing it -15 degrees.\n\nI added an animation in the example below to demonstrate the transform values used in creating the box top.\n\nSee the Pen Simple Box, 1 by Katy DeCorah (@katydecorah) on CodePen\n\nI used pseudo elements, :before and :after, to create the left and right sides of the box. Since it’s a box, I styled the sides with the same dimensions as the top, using the variable $boxSize.\n\nI was curious where :before and :after would lay before I started transforming them individually. Without telling the transform otherwise, :before and :after assumed the same transform values (in this case, skew and rotate) from the main element. Without applying each pseudo element’s own skew and rotate, I ended up creating a stack of elements.\n\nI added an animation in the example below to demonstrate the stack of elements before I transformed them into sides.\n\nSee the Pen Simple Box, 2 by Katy DeCorah (@katydecorah) on CodePen\n\nTo create the sides, I skewed each pseudo element 45 degrees and then translated it into place. I translated each side relative to the size of the box, making the box scalable. If you adjust $boxSize, the box will happily scale to your input. I also applied a slight adjustment of 0.025 to the translate. I found that the sides didn’t match up exactly how I liked them, so I persuaded them into place.\n\nI added an animation in the example below to demonstrate the transform (skew and translate) used to create the sides of the box.\n\nSee the Pen Simple Box, 3 by Katy DeCorah (@katydecorah) on CodePen\n\nI also tweaked the background for each element to take $mainColor, adjust the hue, and lighten it slightly to add dimension to the box.\n\nAnd there you have it, a box.\n\nHooray! Box!\n",
  tags: ["CodePen","Sass","Haml","transform","single element"],
  id: 122
});
index.add({
  title: "Albany Pine Bush &amp; Family Sunday",
  category: "adventures",
  content: "Saturday morning we visited the Albany Pine Bush at Karner Barrens East &amp; West. We took the blue trail to the yellow. Despite the chill, it was a really nice 2.6 mile hike and it only took us about an hour.\n\n\n\n\n\n\n\n\n\n\n\n\n\nOn Sunday, I met up with my mom for lunch at Abuelo’s, a new Cuban restaurant in Fort Edward. I had the chorizo over rice and it was fantastic.\n\nAfter lunch we checked out the Spa City Farmers’ Market in Saratoga. I picked up a pair of butternut squash, kale, and baklava.\n",
  tags: ["fresh air","hiking","family","treats"],
  id: 123
});
index.add({
  title: "Rabbit by Beard Chicken",
  category: "code",
  content: "See the Pen Rabbit by Beard Chicken by Katy DeCorah (@katydecorah) on CodePen\n\nThis fun little animation was built from Beard Chicken’s Dribbble shot. (The animation will only run a couple of times here, but on CodePen it’s infinite… hypnotizing even.)\n\nI used only two elements for this project by putting box-shadow to work.\n\nThe main element .rabbit is the rabbit’s body. The :before is the tail, but then I used box-shadow to resize, recolor, and relocate the element’s shadow into making the rabbit’s eye. I added another box-shadow and made the rabbit’s hind leg. Then I added multiple shadows to create the front leg.\n\nSimilarly, the rabbit’s :after is one ear. By using box-shadow, I was able to create the second ear.\n\nI created one cloud using pseudo elements, but then used box-shadow to display two more clouds.\n\nSpread-radius\n\nThe fourth value of box-shadow controls the size of the shadow, or spread-radius. Until today, I had severely under used this value.\n\nbox-shadow: &lt;offset-x&gt; &lt;offset-y&gt; &lt;blur-radius&gt; &lt;spread-radius&gt; &lt;color&gt;\n\nMore on box-shadow\n\nThe spread-radius is optional, but the value is 0 unless specified. If the spread-radius is greater than 0, then the shadow will grow. If the spread-radius is less than 0, then the shadow will shrink. When shrinking the shadow, you have to use small units (especially in ems), otherwise the shadow will disappear.\n\nSo in the case of .clouds:\n\n.clouds {\t...\tbox-shadow: 5em 2em 0 -0.3em white, -2em 2em 0 white;}\n\nThe first box-shadow creates a copy of the element, but is moved to the right 5em and down 2em. I slightly shrunk the new cloud, using -0.3em for the spread-radius. Naturally, I set the color of the cloud to white. For the second box-shadow, I moved it to the left 2em and down 2em, but kept it the same size. I set the blur-radius to 0 for both shadows so that there is no blur and I receive a crisp cloud.\n\nGetting the @keyframes just right took a bit of adjusting, but I loved how this rabbit came to life!\n",
  tags: ["CodePen","Sass","Dribbble","box-shadow","animation"],
  id: 124
});
index.add({
  title: "Pretzels &amp; Williamsburg",
  category: "adventures",
  content: "Saturday night I had an all out snack attack. Right before heading to the store to pick-up rice krispies treat supplies, my boyfriend asked for pretzels. So I added yeast to my list.\n\nI was kind of grumpy as I was making the pretzels, because I thought I was doing a bad job. As soon as the dough warmed up, it was much easier to manipulate.\n\nAnd oh my, they tasted amazing fresh out of the oven.\n\n\n\n\n\n\nEasy homemade soft pretzel recipe\n\nSunday morning we drove down to the Beacon rail station and took the 10:12 AM train to Grand Central Station. We were headed to Williamsburg for the night to see Knapsack play. Unfortunately, we chose the weekend that the L train was out of service, so we fumbled around the subway until we caved and summoned a car via Uber. It was our first Uber experience and we both loved it.\n\nWe got a place for the night on Airbnb in Williamsburg.\n\n\n\n\n\n\nWell designed, elevator entrance, amazing views, and a giant fluffy bed. It was perfect.\n\nAfter we rested for a few minutes, we set out. We visited the Poler pop-up shop and had a great late lunch at Pies’n’Thighs.\n\nNext we slowly meandered back to the apartment and rested before we headed to the Music Hall. Before we left the building, we checked out the view from the roof.\n\n\n\n\n\n\nWe had a few minutes to kill before the show started, so we explored a bit more.\n\n\n\n\n\n\nAfter the show, which was fantastic, we headed for a late night dinner at The Meatball Shop.\n\nIn the morning, we packed up and headed to Blue Bottle Coffee for a quick breakfast (and you know I got that smore). Then we headed into Manhattan for some more wandering. We walked around Times Square, grabbed lunch at Shake Shack, and checked out a few stores.\n\nWe had a really great time.\n",
  tags: ["music","treats"],
  id: 125
});
index.add({
  title: "Tea, Wine, &amp; Mud Pond",
  category: "adventures",
  content: "Tea\n\nOn Sunday, mom and I went to lunch at the Whistling Tea Kettle in Ballston Spa. She had the Connie’s baked apple pie tea and I had the vanilla chai.\n\nAfter lunch, we walked around town and stopped in Wheats &amp; Sweets for a giant cookie.\n\n\n\n\n\n\nWine\n\nMy cousin Kaylee works at Oliva Vineyards in Fort Edward. We stopped in for a wine tasting after exploring Ballston Spa. We enjoyed six different wines and both bought a bottle of the Pretty Filly Rosé (the bottle included a little kit to make mulled wine).\n\nThe vineyard is also home to thoroughbred horses.\n\n\n\n\n\n\nMom got this great shot of me just as I was giggling, “My hand went in his mouth!”\n\n\n\n\n\n\nNassau Mud Pond Preserve\n\nOn Monday, my boyfriend and I drove out to Nassau to explore the new Mud Pond Preserve. It was a 1.2 mile round trip through the woods, ending at an overlook of Mud Pond. We were in and out in under 40 minutes.\n\nThe view of the pond wasn’t very clear, but the trail was decent. The trailhead was well marked and included a large parking area. The trail is located at 591 Central Nassau Road next door to the town dump.\n\n\n\n\n\n",
  tags: ["fresh air","family","hiking"],
  id: 126
});
index.add({
  title: "Scalable balloons",
  category: "code",
  content: "See the Pen Random Customizable Balloons by Katy DeCorah (@katydecorah) on CodePen\n\nI saw this Dribbble shot and decided to spin out a few ideas. I ended up creating customizable, random-generated, scalable balloons!\n\nI started by creating a single .balloon element. I styled the main element for the actual balloon shape, the :before for where the balloon is tied, and :after for the string.\n\nAfter I styled the first balloon, I absolutely positioned the balloon from the bottom, using the height of the string as the bottom value. I set the html and body height and width to 100% and hid the overflow, to keep my balloon on the page and at the bottom.\n\nTime for more balloons!\n\nI added more .balloon elements and wrote a Sass loop to give each balloon slight customizations. For example, I adjusted the hue of each balloon based on a predetermined color. I also used rgba to give a nice transparent look to the balloons whenever they collide.\n\nbackground: rgba(adjust-hue($balloonColorStart,random(360)),0.5);\n\nHere $balloonColorStart is defined at the top of my Sass file, to be easily changed.\n\nIn the Sass loop for the balloons, I created a variable called $stringHeight and set it to a random number up to 20em. I used $stringHeight for the height of the :after (which represents the string) and for the bottom value for each balloon element in the loop. Just like I had done before with my first balloon, but now dynamic.\n\nI also created a variable, $balloonLeft, to increment itself after every iteration of the loop to be applied as the left value. This made sure the balloons remained evenly spaced out.\n\nAt this point, I thought I was finished, but when I changed the width and height of the balloons to make them smaller, I noticed that the they didn’t scale so well. The pseudo elements were no longer centered at the bottom of the balloon and the balloons were awkwardly spaced.\n\nLet’s make this thing scalable.\n\nI decided that the balloon width, or $balloonWidth, would be the main variable in keeping my proportions tight. From this variable, I calculated the height of the balloons by hitting height: $balloonWidth * 1.25. Now the height and width of my balloons are in proporation.\n\nNext, I adjusted my :before, or the rubber tie part of the balloon, to be in proportion with the width of the balloon. Here’s what I came up with:\n\nwidth: $balloonWidth / 8;height: $balloonWidth / 14;bottom: ($balloonWidth / 14) * -0.75;left: ($balloonWidth / 2) - ($balloonWidth / 14);\n\nI went back and forth between setting the $balloonWidth from a low number and then to a high number and decided that those equations suited my rubber tie part of the balloon best.\n\nFor the balloon string, I did a similar guess and check. I only needed to control the left position of the :after element, to center the string on the balloon, and found  left:($balloonWidth / 2.1); to be the sweet spot.\n\nI also adjusted the $balloonLeft variable to take into account the balloon width. By doing so I added a new variable, $balloonProx to tweak the proximity of the balloons: $balloonLeft: $balloonLeft + ($balloonWidth/$balloonProx);\n\nLastly, I added a slightly floaty animation. I used random for the animation time, for a more natural, whimsical feel. I’m all about the whimsies.\n",
  tags: ["CodePen","Sass","Haml","random","animation"],
  id: 127
});
index.add({
  title: "Albany Rural Cemetery",
  category: "adventures",
  content: "On Sunday, mom drove down for part of the day. We grabbed lunch at the Pump Station and then explored the Albany Rural Cemetery. I got the idea to check out the cemetery from All Over Albany.\n\nThe cemetery is huge and holds beautiful stones and mausoleums.\n\n\n\n\n\n\n\n\n\n\nPresident Arthur\n\n\n\n\n\n\n\nDalton\n\n\n\n\n\n\n\n\n\nG.C. Hawley 1917\n\n\n\n\n\n\nMcCoy\n\n\n\n\n\n\n\n\n\n\nBurden 1850\n\nMy favorite of the day. The Burden tomb holds Henry Burden, an engineer from Troy, and several of his family members.\n\n\n\n\n\n\n\n\nI found information about the Burden tomb from Henry Burden By Mrs. Margaret E. Burden, including this old rendering of the tomb:\n\n\n\n\n\n\nIt’s amazing to see this rendering after seeing it first hand. The area surrounding the Burden tomb is much more congested now with other stones, tombs, and trees. It makes me want to go back and take a picture from the same angle to catch the differences. I remember seeing the book sculpture out front, but I couldn’t read the inscription because the pages were too weathered. The digitized book linked above provides an inscription.\n\nI look forward to visiting the Albany Rural Cemetery again.\n",
  tags: ["fresh air","family"],
  id: 128
});
index.add({
  title: "Ice Cream Pattern by Dorottya Porkolab",
  category: "code",
  content: "See the Pen Ice Cream Pattern by Dorottya Porkolab by Katy DeCorah (@katydecorah) on CodePen\n\nDribbble shot Ice Cream Pattern by Dorottya Porkolab\n\nFor this pen, I made each ice cream a single element. I used border-top for the pink section, border-bottom for the green section, and background for the yellow section. The inner ice cream shadow is a :before and the stick is an :after.\n\nI rotated the ice cream bars using the nth-child selector, but more specifically calling out odd and even. The odd and even ice creams have similar styling, but the odd is a reflection of the even. To acheive this, I only really had to swap around and lighten the shadows and on the odd ice creams. The trickiest part was adding just the right amount of margin to make the pattern look evenly spaced out.\n\nI applied a width to the body to ensure that the pattern will stay inline. Then I hid the overflow to keep the pattern tight against the browser.\n\nAnd then I made an animation on hover because it’s Friday.\n\nThis pen was my pursuit in redemption after creating this morbid pen yesterday in honor of Halloween.\n",
  tags: ["CodePen","Sass","Dribbble","Haml","treats"],
  id: 129
});
index.add({
  title: "Git file renaming",
  category: "code",
  content: "Today at work I needed to move and rename a ton of files, but I also needed to make sure that the Git history followed. When I tried to move the files manually, SourceTree thought I deleted the files and then created new files elsewhere. When I commit files like this, SourceTree is usually smart enough to catch on, but it wasn’t happening. No good.\n\nIt took me a while to figure this all out, so I figured I’d share.\n\nIn the root, I had nearly 1000 files with the following naming schema: L1T1-page01.cfm (standing for lesson 1, topic 1, page 1). All together there are 8 lessons, each lesson has multiple topics, and each topic has multiple pages.\n\nI needed to move these files from the root and into organized folders: L1T1-page01.cfm would reside at lessons/01-lesson-name/01-topic-name/L1T1-page01.cfm.\n\nSo I had to git mv these files myself; a new-to-me command.\n\nFirst, I moved batches of files belonging to the same topic to their respective topic folders by hitting this command:\n\ngit mv L1T1* lessons/01*/01*\n\n(Can I get a hell yeah for that asterisk?)\n\nAfter I moved the files I realized I wanted to shorten the filenames from L1T1-page01.cfm to 01.cfm.\n\nWithin each topic folder, I hit the following command:\n\nfor f in *.cfm; do git mv $f $(echo $f | sed ‘s/L[0-9]T[0-9]-page//g’);done\n\nUpdate 1/7/2014: I revisited this post, I’m so glad I had save these commands! I found that instead of going into individual folders, I can run the commands from the lessons/ folder and let it ride:\n\nfor f in */*/*.cfm; do git mv $f $(echo $f | sed ‘s/L[0-9]T[0-9]-page//g’);done\n\nIt worked. Just by looking at the last command, I know there’s a smarter way to write it. Nevertheless, it worked and I’m kind of proud of myself.\n\nAs I was figuring this out, I imagined the scene from Hook where Peter begins to remember how to play pretend and the children are like “You’re doing it, Peter.”\n\n &nbsp; \n",
  tags: ["Git"],
  id: 130
});
index.add({
  title: "Hallowiener by Bobby McKenna",
  category: "code",
  content: "See the Pen Hallowiener by Bobby McKenna by Katy DeCorah (@katydecorah) on CodePen\n\nAnother Dribbble shot turned code. Hover for zombification.\n\nDribbble shot Hallowiener by Bobby McKenna.\n\nThis was also slightly inspired by Apple Mice By Josh Bader. I loved his graceful transitions between each mouse, which made the experience more of a metamorphosis.\n\nWhen creating a metamorphosis, I recommend building the result or hover state first.\n\nIn this case, I started with the zombie face. Once I had the zombie face, I copied all of the styles and pasted them under the hover state for the .head element. At this point, when I hovered on the head I saw no difference, because it was a zombie face hovering to zombie face.\n\nNext, I needed to make the normal state the normal face. To do this, I carefully adjusted the styles of the normal state. I tried to be consistant among elements with styling to make smoother transitions. If there was an element that appeared in one state, but was removed from the next, I tried to use opacity instead of display:none. I’ve found that opacity will usually give you a more pleasant transition.\n\nLastly, I * styled a transition to allow all of the elements to glide into zombie mode when hovered. I also tried to remove redundant code from the normal and hover states where possible.\n\n(My code could be cleaner, but I didn’t feel like being picky on a fun Pen.)\n",
  tags: ["CodePen","Sass","Dribbble","Haml","Halloween"],
  id: 131
});
index.add({
  title: "Greenwich &amp; treasure hunting",
  category: "adventures",
  content: "On Saturday, I woke up early and drove down to Greenwich, CT. A very good friend of mine moved down there earlier this year with her husband. She showed me their new place and around town. We ordered sushi to-go and enjoyed it on the beach. It was a really great day.\n\n\n\n\n\n\n\n\nEast Arlington Antique Center Movie Theatre\n\nOn Sunday, I joined my boyfriend’s family to Vermont. We celebrated his sister’s birthday with a delicious lunch and treasure hunting in antique stores!\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nI picked up this old cigar box.\n\n\n\n\n\n\nBennington Monument\n\nOn the way home, we stopped at the Bennington Monument.\n\n\n\n\n\n\n\n",
  tags: ["fresh air","the ocean","red shoes","family","treasures"],
  id: 132
});
index.add({
  title: "Mount Baker &amp; Aunt Pauline’s .22",
  category: "adventures",
  content: "Mount Baker\n\nThis weekend I visited my friend Becky in Lake Placid. We woke up early on Saturday to hike Mount Baker.\n\nMoody Pond\n\n\n\n\n\n\nThe Way Up\n\n\n\n\n\n\n\n\n\nAt The Top\n\nAmazing view! There were so many lady bugs at the top of the mountain that we were covered with them!\n\n\n\n\n\n\n\n\n\n\n\n\n\nMirror Lake\n\nSunday morning Becky and I did a lap of Mirror Lake.\n\n\n\n\n\n\nThanks for having me, Becky!\n\nAunt Pauline’s .22\n\nOn Sunday I visited my folks. Dad taught me to shoot Aunt Pauline’s .22. A few people asked why all of the sudden I wanted to learn to shoot. Lately, I’ve been worried about getting too comfortable with life. This definitely tested my comfort level.\n\nWhile I missed the actual targets, I hit the paper every time. Thanks, Dad!\n\n\n\n\n\n\n\n\nUnfortunately, the pumpkin I carved over the weekend did not make it home in one piece.\n\n\n\n\n\n",
  tags: ["fresh air","hiking","red shoes","friends","family"],
  id: 133
});
index.add({
  title: "Navigation Bar by Jan Kaděra",
  category: "code",
  content: "See the Pen Navigation Bar by Jan Kaděra by Katy DeCorah (@katydecorah) on CodePen\n\nAnother Dribbble shot for the books. This time it’s Navigation Bar by Jan Kaděra. I did my own interpreting for the hover. So please, give that nav a hover!\n\nThe navigation is typical list, where I primarily styled the anchor tags. I used pseudo elements to create edges for each button, which made it a snap on styling the hover. However getting the edges of the buttons just right was a task. I can still see that’s not exactly right, but I decided to walk away for now. I’ll save that for a rainy day.\n\nThis Pen made me realize how much I enjoy writing Haml; so much that I’m thinking about changing my default HTML setting to it on CodePen.\n\nUpdated 01/09/2014\n\nThis Pen is #65 on the Top Pens of 2013 list. Yay!\n",
  tags: ["Sass","Dribbble","Haml","CodePen","yay"],
  id: 134
});
index.add({
  title: "Apple Pickin &amp; Apple Pie Makin",
  category: "adventures",
  content: "Saturday\n\nWe woke up early and drove to Golden Harvest Farms in Valatie. We chose this spot apparently they have the best cider donuts. And they do.\n\nWe set out to pick a ½ bushel of apples and started by taste testing all the available varieties. The jonagolds are definitely my favorite. Then we picked up a ½ dozen donuts (+2 for immediate consumption) and apple cider.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nSunday\n\nI put those apples to work.\n\n(Right before I rolled out the dough, I realized that I don’t own a rolling pin. I found that a cling wrapped a wine bottle rolled dough quite nicely.)\n\n\n\n\n\n\n\n\n\n\n\n\nOld Fashioned Apple Pie recipe\n",
  tags: ["fresh air","pie"],
  id: 135
});
index.add({
  title: "BoldMedia Logo Variation by Jeroen van Eerden",
  category: "code",
  content: "See the Pen BoldMedia Logo Variation by Jeroen van Eerden by Katy DeCorah (@katydecorah) on CodePen\n\nA Dribbble shot that I coded out and added some fun transitions on hover.\n\nBoldMedia Logo Variation by Jeroen van Eerden\n",
  tags: ["Sass","Dribbble","Haml","CodePen"],
  id: 136
});
index.add({
  title: "Incrementally awesome Sass labels",
  category: "code",
  content: "For this site I wanted my categories to be color coded, but I didn’t want to put a lot of effort into managing it. Instead I spent a little effort into making sure I didn’t have to manage it.\n\nThe Set-up\n\nWhere I want a category to be color coded, I used the class of ‘label.’ While not immediately semantic, it could allow for flexibility in the future. I’m also a Bootstrap fan, so it was a go-to move. This class is intended to be used on inline elements such as spans or anchor tags.\n\nSample: label\n\nStyle:\n\n\n\nI set a default background as a starting point and just in case something fails.\n\nNext I created a Sass list to define each category.\n\n\n\nFor each category I created its own supplemental class. Each class incrementally changes the background-color of the original color $blue. Based on how many categories I have I chose 35 to be my increment. This may need to be adjusted if you have more or less items and depending on how close of a color spectrum you desire.\n\n\n\nTada\n\nA miraculous rainbow of categories.\n\nlabel\nedibles\nadventures\ncode\nplaylists\nfreelance\n\nThings to consider\n\nI can easily add categories, woo!\n\n…but if I end up with more than 9 categories (hopefully not), then my color spectrum is going to get a bit cozy.\n",
  tags: ["Sass"],
  id: 137
});
index.add({
  title: "Mount Greylock",
  category: "adventures",
  content: "We woke up early and drove out to Mount Greylock in Mass. It was a gorgeous morning!\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nThen these dudes decided to paraglide off the summit.\n\n\n\n\n &lt;/param&gt; &lt;/param&gt; &lt;/param&gt; &lt;/param&gt;&lt;/embed&gt;\n\n",
  tags: ["fresh air"],
  id: 138
});
index.add({
  title: "Google Static Map Maker",
  category: "code",
  content: "The Google Static Map Marker is also served on its own page.\n\nSee the Pen Google Static Map Maker by Katy DeCorah (@katydecorah) on CodePen\n\nAfter working with Google Static Maps for some of my posts (re: Static Google Maps Image for Jekyll Posts), I started scheming on an easier way to arrive at a map. I thought this might be helpful for other people too.\n\nThis project is powered with Angular. I’ve only dabbled in Angular, but it came in handy because it’s so great with forms.\n\nHead Scratcher\n\nOne thing that had me scratching my head: how to evaluate an expression, but then output something else. For instance, when there is no value for the API Key input, I don’t want the parameter to be displayed in the API call. Because if the value of api is blank, it can throw an error. I knew I needed a way to check the value of the input and output code based on that evaluation, but I couldn’t  figure out how to write it.\n\nFinally, I figured it out.\n\n{{ e.API !== '' &amp;&amp; '&amp;key='+e.API || ''}}\n\nWherever this is present, it will evaluate the input and then output based on evaluation. If the input does not equal an empty string, or if the input has a value, (e.API !== '') then output &amp;key=[whatever the api key is] otherwise (||) show '' (empty string).\n\nI evaluated the checkbox for the Map Marker (showMarker) the same way:\n\n{{ showMarker == 'true' &amp;&amp; '&amp;markers=size:'+e.markerSize+'%7Ccolor:'+e.markerColor+'%7C'+e.location.split(' ').join('+') || '' }}\n\nAngular is pretty cool.\n",
  tags: ["Google Maps","AngularJS","CodePen","Sass"],
  id: 139
});
index.add({
  title: "2013 Summer",
  category: "playlists",
  content: "\n",
  tags: [],
  id: 140
});
index.add({
  title: "Adirondack Balloon Festival &amp; Coldbrook Preserve",
  category: "adventures",
  content: "Balloon Festival\n\nFriday night I drove to my folks house. The next morning, Mom and I woke up at 4 am. We drove to Glens Falls to take the 5:10 bus to the Adirondack Balloon Festival for the 100 balloon launch. We walked around the still dark airport runway while people began accumulating. We purchased a duo of coffee and bagels and stood around until launch time at 6:30. It was a pleasant morning, 55 degrees.\n\nOnce the sun came up, the wind picked up. Crews unfolded balloons and brought them to life, but the wind won. The wind tossed the balloons around like rag dolls making the crowd gasp. That was it. No balloons to launch. Everyone was so tired and so disappointed.\n\n\n\n\n\n\n\n\n\n\n\n\nColdbrook Preserve\n\nWe got back into Glens Falls around 9 am and stopped for breakfast at The Peppermill. After mom and I rested a bit, we decided to take advantage of what was left of the now sunny Saturday.\n\nWe drove out to the Coldbrook Preserve in Wilton. The preserve has a few very pleasant trails through forest and marsh. I would definitely go back.\n\n\n\n\n\n\n\n\nAdding to my collection of man-made things growing in trees.\n\n\n\n\n\n\n\nStump vision.\n\n\n\n\n\n\n\n\n\n\n\nDespite the disappointment of the canceled balloon launch, I had a really great day with my wonderful mom.\n",
  tags: ["fresh air","family","hiking","ADK Balloon Festival"],
  id: 141
});
index.add({
  title: "Bowl of trees",
  category: "code",
  content: "See the Pen Bowl of Trees by Katy DeCorah (@katydecorah) on CodePen\n\nI could not have made this without Haml and Sass. This is comprised of a list with 100 list items. Each list item is styled differently. What’s more, you will always get a different configuration of trees, the color of the trees, and animation speed of the trees on refresh. This is all thanks to the random() Sass function on CodePen.\n\nAt the last minute, I decided to add the dumping of the trees on hover. It passed in my mind, but once I saw it happened I squealed with glee!\n\nSo please, give the bowl a hover!\n\nThe design is inspired by Graph #3 by Jordan Kasten-Krause.\n\nThis is one of my favorite Pens so far!\n",
  tags: ["CodePen","no JS","Haml","Sass","random"],
  id: 142
});
index.add({
  title: "Accordion nav",
  category: "code",
  content: "See the Pen Accordion Nav by Katy DeCorah (@katydecorah) on CodePen\n\nThis is very typical list-style navigation, in that the dropdown/accordion effect is a nested list.\n\nI think what made the effect successful was dividing the responsibilities of the navigation among the elements. Each list item has an anchor tag, naturally, but I made sure that the majority of the physical design was styled in the anchor tags. The actual list items handle more of the function.\n\nFor instance, each li element on hover will release the dropdown. This made sure that as I hovered into the dropdown, it didn’t slide back up. Had I put event on the anchor tags, once I hover off of the parent and onto the children, the dropdown would slide back up.\n\nLikewise, I styled the anchor tags to make sure the styles didn’t intrude on the effect when the dropdown was activated. Had I styled the background of the li elements, when hovered the dropdown would be hugged by the color of the list-item’s parent.\n\nThe overall effect of the accordion is achieved by skewing the list items, but I also made the overflow hidden when the dropdown is inactive. Otherwise my text from the inactive dropdown would be sitting all squished and weird for the world to see.\n\nI’m really happy that so many people enjoyed this one!\n",
  tags: ["CodePen","no JS","Haml","Sass"],
  id: 143
});
index.add({
  title: "Decorating a wedding",
  category: "adventures",
  content: "This weekend I had the privilege of decorating a friend’s wedding at the Wilburton Inn in Manchester, Vermont. As payment, my boyfriend and I got to stay all weekend at the Inn. It was an excellent trade!\n\nThe bride and I worked together weeks before the wedding crafting and scheming. On the day of, I oversaw all the decor preparations. It was a really fun, but exhausting day.\n\nUnfortunately I did not take enough pictures, but here are a few.\n\n\n\n\n\n\n\n\n\n\nA few from the Inn.\n\n\n\n\n\n\n\n\n\n\nI’m so happy with how the slate signs came out. I designed the text in Illustrator, then my boyfriend printed out the designs on vinyl. I applied the vinyl directly to the slate and gently dabbed the paint on with my fingers. I immediately peeled off the vinyl and allowed the slate to dry. I love telling people that I finger painted these!\n\n\n\n\n\n\n\n\n\n\n\nSome raw materials collected from the great outdoors! Special thanks to my boyfriend’s sister for collecting the acorns. We filled glass jars with the acorns and filled the top of the jar with mums.\n\n\n\n\n\n\n\n",
  tags: ["fresh air","crafts"],
  id: 144
});
index.add({
  title: "VSCO Cam logo",
  category: "code",
  content: "See the Pen VSCO CAM logo by Katy DeCorah (@katydecorah) on CodePen\n\nI use VSCO Cam regularly for iPhone photo editing. The loading animation of the VSCO Cam logo had intrigued me for a while, so I decided to write it out.\n\nThe animation only runs once.\n",
  tags: ["Sass","Haml","animation"],
  id: 145
});
index.add({
  title: "Simple split color",
  category: "code",
  content: "See the Pen Simple Split Color Element by Katy DeCorah (@katydecorah) on CodePen\n\nThe effect is achieved on a single element using the properties border and box-sizing.\n\nThe border, only manipulating one side, must be half of the element’s width for a vertical split. For a horizontal split the border must be half of the element’s height.\n\nIn the example, the circle is 20 x 20em and has a border left width of 10em. I set the border color to white with a really low alpha (rgba) so that the border would pick up the color of the background, but add a very light white on top.\n\nUniversally, I set the box-sizing to border box. If I didn’t set the box-sizing, then my shape would be warped with dimensions of 30 x 20em. Setting the box-sizing to border box allows the border to be included in the width/height of the element.\n",
  tags: ["Sass","single element"],
  id: 146
});
index.add({
  title: "Static Google maps for Jekyll",
  category: "code",
  content: "As of 7/26/2014, this site has moved to the Mapbox static API.\n\nI have several posts with locations and I wanted a better way to integrate them into my posts. I tinkered around with the static Google Maps Image API and found a neat little solution.\n\nCode\n\n\n\nExplanation\n\nFor any post with a location, I add a “locations” variable in the post header.\n\nlocations: - University at Albany - Siena College\n\nI’m using locations to support multiple places, but you can have just one.\n\nlocations: Albany,NY\n\nYour location can be a place, a city, an address, or even coordinates. Really anything you would enter into Google Maps search.\n\nLive Example\n\n\n\nZoom for Multiple Locations\n\nWhen using multiple locations, the map will center around the first location. So it would be wise to put your most centrally located destination first. You might also need to change the zoom on the map. You can do this by adding a “zoom” variable in the post header.\n\nlocations:  - University at Albany  - Siena Collegezoom: 10\n\nThe lower the zoom, the farther out the map will reach. The zoom is automatically set at 13, which is ideal for 1 location (but you can adjust that in the code).\n\nMore Information\n\nTake a look at the Google Maps Image API for more parameters. You can learn how to adjust the size of the image, styling markers, and much more.\n",
  tags: ["Jekyll","Google Maps","API","maps"],
  id: 147
});
index.add({
  title: "Haml clock",
  category: "code",
  content: "See the Pen Haml Clock by Katy DeCorah (@katydecorah) on CodePen\n\nAfter creating the Haml calendar, I decided to go for a Haml clock.\n\nHow it works:\n\n\n  Haml provides the initial time.\n  Internal Sass rotates the hands of the clock to portray that time.\n  CSS animation keeps the hands ticking.\n\n\nInitially I only used an inline style to set the rotation of each hand. I wanted to write the animation/keyframes in the external stylesheet, but that wasn’t going to work. The animation kept reseting to 0. For example, if it’s 1:15, the minute hand would initially start at 15 (rotate 90 degrees) and then rotate slowly to the next minute (96 degrees). Instead the animation would only start 0 degrees; I couldn’t get the inline rotation to speak with my external animation. To make the animation work, I wrote internal Sass so that the first keyframe was at the starting time and not reverting to 0.\n\nFeatures\n\nI spent some extra time figuring out how to support different timezones. The clock is currently set at UTC-4 (EST). You can easily change the timezone in the Haml, it’s the very first variable.\n\nThe CSS is all em-based and happily responsive. When the width/height is too small, then the digital time displays.\n\nFor an added bonus: the background color darkens as the day progresses. (My better half suggested that one.)\n\nCredits\n\nI received design and color inspiration from Dribbble. Also, I used Hugo Giraudel’s items on a circle mixin. I really love that mixin!\n",
  tags: ["CodePen","Haml","Sass","responsive"],
  id: 148
});
index.add({
  title: "Thacher Park in the morning",
  category: "adventures",
  content: "Beautiful morning.\n\n(Confession: before today I was spelling Thacher with two ts.)\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPost-hike treat\n\nLater that day we tried to get a cronut from The Crispy Cannoli, but they were all out. I happily settled on a cannoli.\n\n\n\n\n",
  tags: ["fresh air","hiking","treats","red shoes","recommended"],
  id: 149
});
index.add({
  title: "Simple icons",
  category: "code",
  content: "Original design by Rovane Durso.\n\nSee the Pen Dribbble//Simple Icons by Katy DeCorah (@katydecorah) on CodePen\n",
  tags: ["Haml","Sass","CodePen","Font Awesome"],
  id: 150
});
index.add({
  title: "The Black Bean Brownie",
  category: "epicurean",
  content: "Surprisingly amazing! The brownies didn’t taste or have the texture of black beans.\n\nThe recipe requires you to whip everything up in a blender, making the whole process easy. However, I don’t own a blender. I do have a small electric chopper. I threw a can of black bean in the chopper turning the beans into a paste. Next I mixed all the ingredients in the Kitchenaid. In no time the black beans smoothed out and the batter looked just like regular brownie batter.\n\nEach brownie is about 125 calories. The recipe makes 16.\n\n\n\n\n\n\n\nBlack Bean Brownie Recipe\n",
  tags: ["brownies"],
  id: 151
});
index.add({
  title: "Mini dark settings window",
  category: "code",
  content: "Original design by Ben Bate.\n\nSee the Pen Dribbble//Mini Dark Settings Window by Katy DeCorah (@katydecorah) on CodePen\n",
  tags: ["Haml","Sass","CodePen","Dribbble"],
  id: 152
});
index.add({
  title: "Washington County",
  category: "adventures",
  content: "Mom and I went on a Washington County/Vermont adventure today.\n\nArgyle, NY\n\n\n\n\n\n\nCossayuna Lake\n\n\n\n\n\n\n\n\nHebron, NY\n\n\n\n\n\n\n\n\n\nRexleigh Bridge in Shushan, NY\n\n\n\n\n\n\n\nRupert, VT/Salem, NY\n\n\n\n\n\n\n",
  tags: ["fresh air"],
  id: 153
});
index.add({
  title: "Bird in a tablet",
  category: "code",
  content: "As a kid, I remember drawing a picture of a bird on one side of paper and a cage on the other. When you spin it back and forth quickly, it appears that the bird is in the cage. Here’s a take on that.\n\nSee the Pen Bird in a tablet. by Katy DeCorah (@katydecorah) on CodePen\n",
  tags: ["CodePen","Sass","Haml","no JS","Font Awesome"],
  id: 154
});
index.add({
  title: "Random() bubbly",
  category: "code",
  content: "Giving the Sass random() a go.\n\nSee the Pen Random Bubbly by Katy DeCorah (@katydecorah) on CodePen\n",
  tags: ["CodePen","Sass","Haml","no JS","random"],
  id: 155
});
index.add({
  title: "AngularJS contact form",
  category: "code",
  content: "My first try Angular form validation.\n\nSee the Pen Angular Contact Form by Katy DeCorah (@katydecorah) on CodePen\n",
  tags: ["CodePen","Sass","Haml","AngularJS"],
  id: 156
});
index.add({
  title: "Haml calendar",
  category: "code",
  content: "See the Pen Haml Calendar by Katy DeCorah (@katydecorah) on CodePen\n\nWhile I was looking through the Haml docs today, I found the ability to print out the date. My gears started spinning. Why not create a calendar?\n\nIt took a lot of research, but I made a functioning Haml Calendar. I say functioning, because it will display the correct date and tomorrow it will automatically display tomorrow’s date. You may also change the month, year, and day variables to display a specific date.\n\nI realize this is not a practicular calendar solution, but it was fun to figure out.\n\nI used these shots from Dribbble for layout and color inspiration.\n\nStarting out\n\nThe first step: print out today’s date. Once I got that, I created variables for month, year, and day that default to today’s date unless otherwise specified. I also created an array @days to hold the days of the week in the order I prefer.\n\nI looped through @days to create the headers for the calendar, but I decided to only display the first letter of each day. I used a list because I find that they are easier to style and they help keep my code organized.\n\n- @days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']%ul.weekdays  - @days.each do |i|    %li.weekday      = i[0]\n\nNext I created a new list for the ordinal days of the calendar using a new loop:\n\n%ul.week  - (1...32).each do |i|    %li.day      = i\n\nI started by printing 31 days (with the start of the month at Sunday for now). I styled the list items so that only 7 can fit in each row. The list items naturally fell into calendar order.\n\nAt this point I had a calendar, but it wasn’t accurate. August begins on Thursday, not Sunday. I found that if I adjusted the starting value of my loop, I could get the first of the month to start on Thursday - (-3...32).each do |i|. That works, except now Sunday reads as -3 and so forth. I added a few constraints:\n\n%ul.week  - (-3...32).each do |i|    %li.day      - if i &gt; 0        = i\n\nThe items that are i &lt;= 0 still exist, but they don’t print a number. Instead they create blank space allowing August to begin on Thursday.\n\nThe calendar works, but it’s not dynamic.\n\nMaking it Dynamic\n\nI wrote a new variable called monthStart. Using the date function along with my variables for month and year, I could get the day each month starts on. I wrote another variable to find the position of the first of the month in my @days array. So in @days Thursday’s position is 4, but my loop needs to start at -3 for the month to start on that day. I wrote down every day, its position in the array, and what number the loop needs to start on in order for the month to start on that day. From these findings, I created a formula. I take the negative of the hash and add 1.\n\n- monthStart = Date.new(year, month, 1).strftime(\"%a\")- @days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']- hashDays = Hash[@days.map.with_index.to_a]- monthStartNum = hashDays[monthStart]- adjustMonthStartNum = -monthStartNum + 1\n\nSo I updated my loop:\n\n%ul.week  - (adjustMonthStartNum...32).each do |i|    %li.day      - if i &gt; 0        = i\n\nTo make sure my loop worked, I changed my month variable to 9 to display September. It worked!\n\nHowever, September only has 30 days and I’m still printing out 31.\n\nI wrote another variable called monthEnd. This new variable was slightly easier than monthStart as I automatically receive an integer.\n\n- monthEnd = Integer(Date.new(year, month, -1).strftime(\"%d\"))\n\nI updated my loop once more (Here I add 1 to monthEnd to make sure it gets the last day and not up until the last day of the month):\n\n%ul.week  - (adjustMonthStartNum...monthEnd + 1).each do |i|    %li.day      - if i &gt; 0        = i\n\nYay! Dynamic!\n\nFinishing Up\n\nI added a few more constraints when printing out the days to highlight today and to mute the days before today. I think I can write this more efficiently, but I’m ok with my progress so far.\n\nIf you edit in CodePen, try writing in a custom date. I commented out the space for you to give it a try.\n\nI really enjoyed figuring this out. I’m new to Ruby, but I think I will do more experimenting!\n\np.s. I’m not sure about editing the timezone, so it might be a day ahead.\n",
  tags: ["CodePen","Haml","Sass"],
  id: 157
});
index.add({
  title: "Palmertown Mountain Range",
  category: "adventures",
  content: "We woke up early and drove up to Moreau Lake State Park for a hike.\n\n\n\nWe parked on Spier Falls road, at the bottom of the map just before where the Hudson River curls. We took the Western Ridge (WR) trail, or yellow trail for a majority of the hike. This trail has several scenic overlooks as indicated by stars on the map.\n\n\n\n\n\n\nThe first scenic overlook (and our favorite):\n\n\n\n\n\n\nThe next stop was the overlook of the Spier Falls Dam:\n\n\n\n\n\n\n\n\nWe hiked up to where the yellow and orange trails meet at point 7. We then double backed on yellow and took the white trail to the blue trail until it met up with yellow again.\n\n\n\n\n\n\n\n\nThe weather was perfect and the overlooks were gorgeous, but the terrain was exhausting. We didn’t bring enough trail snacks, there can never be too many trail snacks.\n\n\n\n\n\n",
  tags: ["hiking","fresh air","recommended"],
  id: 158
});
index.add({
  title: "Rensselaerville",
  category: "adventures",
  content: "A nice after work drive to shoot star photos, but the moon was too bright.\n\n\n\n\n\n",
  tags: ["fresh air"],
  id: 159
});
index.add({
  title: "Optical illusions",
  category: "code",
  content: "I gave a few optical illusions a try to flex my Sass skills. The source file for each illusion can be found in the JS tab.\n\nOptical Illusion I\nSee the Pen Optical Illusion by Katy DeCorah (@katydecorah) on CodePen\n\nIn Haml, I spun out a list with 200 items. I put a width on the entire list of 100em and hid the overflow on the body. I wanted to make sure that each row remained in a row, but was wide enough to stretch across the browser. This came in handy when shifting the rows to create the illusion.\n\nI styled each list item the same, 5em square with a gray border-top. This makes 20 items in each row. Every even list item has a background of black.\n\nNext I had to shift every other row in order to create the optical illusion. Knowing I have 20 items in each row, I knew the range for each row (the first 1-20, the second 21-40 and so on). I wrote a @while loop to build an nth-child range and to increment to every other row.\n\nOptical Illusion II\n\nSee the Pen Optical Illusion II by Katy DeCorah (@katydecorah) on CodePen\n\nLike the previous pen, I used Haml to spin out over 300 list items. Each list item was styled the same. I added a width to the list to keep the rows from overlapping at smaller browser widths.\n\nI created a @while loop for each row. There are 24 items in each row, so after each row the varialbe $z is increased by 24.\n\nThe illusion creates three columns that are created by the narrowing of the list items. In order to define each pseudo column I adjusted the first three and last three items. I wrote a @while loop to target the first and last three items in each pseudo column. I defined variables for where each psuedo column begins and ends. The loop incrementally adjusts the width and margin-left. The loop runs a total of three times to account for the first and last three items in each pseudo column. The loop also swaps the border-color for the center pseudo column.\n\nThen I applied a clear on the first item in each row to be sure my rows remain as rows.\n\nOptical Illusion III\n\nSee the Pen Optical Illusion III by Katy DeCorah (@katydecorah) on CodePen\n\nAs before, I spun out 500 list items in Haml. I styled each item the same. All items have a ::before pseduo element that draws the circle. I absolutely positioned the circle to fit between each square.\n\nI gave the list margin: 0 -1em; and hid the overflow on the body. I wanted the illusion to completely fill the page.\n\nSuper simple to style and makes you want to barf after a few minues. A success!(?)\n",
  tags: ["CodePen","Sass","Haml","no JS"],
  id: 160
});
index.add({
  title: "Raspberry Trifle",
  category: "epicurean",
  content: "Incredibly easy and delicious! Once you have the ingredients together, assembly is simple.\n\nI ended up using three packages of frozen Sara Lee pound cake. I cut each cake in half and put the halves side by side. Next I took my glass bowl upside down and used it like a giant cookie cutter!\n\n\n\n\n\nGrand Raspberry Trifle Recipe\n",
  tags: ["treats"],
  id: 161
});
index.add({
  title: "Coconut Thumbprint Cookies with Salted Caramel",
  category: "epicurean",
  content: "I found this recipe on a late night Pinterest binge. I’m convinced people only post delicious treats at night time to induce stomach howling.\n\nThis recipe was easy, but time consuming. You have to roll each cookie into a 1.25” ball and then bread with coconut. And then you have to press a thumbprint in each. I found that the bottom of a 1/4 teaspoon did a much better job than my thumb. The teaspoon came in handy as halfway through baking time, you need to repress all of the thumbprints.\n\nLogic would tell you not to press your bare thumb into dough straight out of the oven, but unfortunately I did it anyway.\n\n\n\n\n\n\n\n\nCoconut thumbprint cookies with salted caramel recipe\n",
  tags: ["cookies"],
  id: 162
});
index.add({
  title: "Windowsill Cherry Tomatoes",
  category: "notes",
  content: "This past winter I decided that I wanted to grow food. More specifically, I wanted to wake up in my Albany studio apartment, reach my hand to my windowsill, and pick food off of my plants.\n\nThat was my dream at the end of January when I first planted the seeds. My dream became a reality this weekend, with a few welcomed alterations. One tomato ripened, but instead of plucking it bedside I plucked it from the backyard that my boyfriend and I share outside of Albany. Wonderful, welcome alterations.\n\nI learned a lot from growing the tomatoes, but it really came down to proper hydration and sunlight. I received amazing sunlight in my Albany studio. I planted all the seeds not expecting them all to sprout, but they all grew! I had to give plants away and had to compost a few of the smaller ones. I ended up with 5 giant plants.\n\nOne mistake I made was that I waited too long to put them outside. I waited a few extra weeks just in case of cold weather, but I really shouldn’t have waited. Instead the plants started growing really tall (around 5 feet) to find more sunlight. By the time I put them outside they were weak and lanky. They ended up shedding most of their original leaves and grew stronger ones while outside.\n\nOnly one tomato has riped so far, I have about a dozen waiting to burst with color. I am just so proud of these guys.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nCheck out the full set\n",
  tags: ["green thumb"],
  id: 163
});
index.add({
  title: "Simple border-width loader",
  category: "code",
  content: "See the Pen Simple border-width loader by Katy DeCorah (@katydecorah) on CodePen\n",
  tags: ["Sass","CodePen","no JS"],
  id: 164
});
index.add({
  title: "Forebruary",
  category: "code",
  content: "See the Pen Forebruary by Katy DeCorah (@katydecorah) on CodePen\n\nA few days ago I saw Forebruary by Ilya Birman; a calendar that doesn’t need replacing! Naturally, I needed to figure this out, CodePen style.\n\nI wrote the HTML in Haml. My main goal was to generate the numbers on the calendar efficiently. It took a some research, but I figured out how to use case statements. I have a feeling there is a better way to increment the numbers in each row, but I haven’t arrived at it yet.\n\nOnce I had everything styled, I tackled the position of the frame. The frame slides to indicate the entire month. The last two columns, highlighted in red, are the weekends. I knew I needed to find out today’s date (to understand the current month) and which day of the week the first day of the month starts. I found JavaScript to find the first day of the month for any given month or the current month.\n\nOnce I had the value for the first day of the month, I was set. August starts on a Thursday, or day of the week number 4 (remember the week starts on Monday). Now I know that, for any month that begins on a Thursday it will have the same starting position. I just needed to absolutely position the frame for each day of the week. I found the position by manually adjusting the numbers. I created if statements to compare the values to move the frame accordingly.\n\nNext month the frame should automatically slide to capture September.\n",
  tags: ["Sass","CodePen","jQuery","Haml"],
  id: 165
});
index.add({
  title: "Triangles",
  category: "code",
  content: "See the Pen Triangles by Katy DeCorah (@katydecorah) on CodePen\n\nI’ve been into simple shapes lately. I found this interesting logo on Dribbble and decided to try it out.\n\nI used one list item for each triangle. Each triangle has a pseudo element as its shaded triangle part. Each triangle has no width or height, instead it’s shaped using border properties. I used the transform property with rotate and skew to massage each triangle into its correct orientation. (On a rainy day, I’d like to try to get the colors brighter and adjust the pseudo triangles to fit more appropriately.)\n\nOn hover the triangles become equilateral with a border-width set at 5em (and 1em for the pseudo triangles) and then I removed any trace of rotate or skew. I adjusted the positioning so that each triangle falls more elegantly.\n\nJust bunch of simple shapes.\n",
  tags: ["Sass","Dribbble","CodePen"],
  id: 166
});
index.add({
  title: "Font Awesome Buttons",
  category: "code",
  content: "See the Pen Font Awesome Buttons by Katy DeCorah (@katydecorah) on CodePen\n\nAnother Dribbble inspired project!\n\nI’ve been using Font Awesome as my icon font for nearly every project. So many fonts to choose from, plus it’s CDN hosted. Nothing like upping that PageSpeed score!\n\nI created simple-to-mark-up buttons. Add the desired Font Awesome icon class to the anchor tag along with icon-btn and specify the color with icon-blue (or red or purple). The icon-btn class draws a simple and proportional circle around the icon. The icon color class will specify its respective color gradient background.\n\nI gave the icon-btn a larger font-size to magnify the detail. This value can be set a 1em to fit comfortably with text.\n",
  tags: ["Sass","Dribbble","CodePen","Font Awesome"],
  id: 167
});
index.add({
  title: "Lake Placid &amp; Potter's Point",
  category: "adventures",
  content: "This weekend I visited my college roommate in Lake Placid. We walked around Mirror Lake once a day, ate delicious food, and people watched. It was refreshing!\n\nOn the way home, I visited my folks. Mom took me to a spot not far from home called Potter’s Point. It’s a short hike in the woods to a really lovely nook along the Hudson River.\n\nI also filled my pockets with felled mini hemlock pine cones. Free craft materials!\n\n\n\n\n\n\n\n\n",
  tags: ["fresh air","friends","family"],
  id: 168
});
index.add({
  title: "CSS octagon",
  category: "code",
  content: "See the Pen Octagon by Katy DeCorah (@katydecorah) on CodePen\n\nAfter creating the CSS Diamond I tried to replicate this Dribbble. I created a list item for each petal. They are all ovals with transparent border-left and border-right and then rotated respectively.\n\nNothing super complicated here. It’s just the magic of border-radius and some transparent/opaque colors.\n\nI starting playing around with the animation and was pleased with my result. If you view on CodePen the animation is infinite.\n",
  tags: ["Sass","Dribbble","animation"],
  id: 169
});
index.add({
  title: "CSS diamond",
  category: "code",
  content: "See the Pen Diamond by Katy DeCorah (@katydecorah) on CodePen\n\nI decided to try to create a CodePen from a Dribbble. I started with Sticker Rebound by Ilja Miskov.\n\nEach top section of the diamond is a list item and its corresponding bottom part is a pseudo element.\n\nThe colors are so good!\n",
  tags: ["Sass","Dribbble","CodePen"],
  id: 170
});
index.add({
  title: "CSS bicycle wheel",
  category: "code",
  content: "See the Pen Bicycle Wheel by Katy DeCorah (@katydecorah) on CodePen\n\nAfter I showed my boyfriend the CSS Octagon, he pointed out that when the octagon has no width, it looks like a bicycle wheel.\n\nI used similar code as the CSS Octagon for the wheel. I did a fancy Sass loop for each spoke. I love a good Sass loop.\n\nGo on, give it a hover!\n",
  tags: ["Sass","Haml","CodePen"],
  id: 171
});
index.add({
  title: "Baklava",
  category: "epicurean",
  content: "Maybe it was the stacks of delicate layers interrupted by expertly chopped walnuts that made me think that making homemade baklava would be impossible. Not true. I found out that baklava is rather simple to make. The best part, I already had most of the ingredients at home.\n\nUnfortunately, it ended up too syrup-y. Fortunately, it ended up too syrup-y.\n\nThe recipe tells you to cut it into squares. Yeah right, triangles.\n\n\n\n\n\nCinnamon Walnut Baklava recipe\n",
  tags: ["treats"],
  id: 172
});
index.add({
  title: "Simple chart",
  category: "code",
  content: "See the Pen Simple chart by Katy DeCorah (@katydecorah) on CodePen\n",
  tags: ["Sass","CodePen","jQuery"],
  id: 173
});
index.add({
  title: "Homemade Vanilla Marshmallows",
  category: "epicurean",
  content: "I love marshmallows. I officially love homemade marshmallows even more.\n\nThe recipe I found was simple to follow. I recommend using a standing mixer; otherwise prepare your guns for a 10-12 minute mix-a-thon.\n\n\n\n\n\nVanilla marshmallow recipe\n",
  tags: ["treats"],
  id: 174
});
index.add({
  title: "Three Mini Vacations",
  category: "adventures",
  content: "Lake Placid\n\nOn Monday, I drove up to Lake Placid to visit my college roommate. We went out to dinner, caught a movie, and walked around the lake. The next morning I drove into town for breakfast and did one last lap around the lake. It was a very short trip, but well worth it.\n\n\n\n\n\nThousand Islands\n\nOn Wednesday, my family and I drove out to Thousands Islands. We checked out the area and took a boat to Rock Island. The next day we drove into Canada to go to the 1000 Islands Sky Deck.\n\n\n\n\n\n\n\n\nPortsmouth, NH\n\nFor the weekend, my sister and I stayed in Portsmouth, NH. We booked an awesome apartment on Airbnb. The apartment was a short walk from downtown. On Saturday we posted up at the beach. We walked into town every morning for breakfast and every night for dinner. We had an excellent time.\n\n\n\n\n\n\n\nI don’t take vacations very often, so I think I felt the need to cram everything into this one week. While it was all great, I definitely look forward to a vacation filled with less.\n",
  tags: ["family","friends","road trip","the ocean"],
  id: 175
});
index.add({
  title: "Raspberry Chocolate Pie",
  category: "epicurean",
  content: "In honor of our nation’s birth I accidentally made a semi-French dessert. Hmm… well. It was good. I mean real good.\n\nOk, it was time consuming. The crust is a Chocolate Pate Sucree, an ingredient that linked to another recipe (if you could have seen my face). However, it gave me a reason to say the name over and over again. You know, fancy words.\n\n\n\n\n\n\n\n\nRaspberry Chocolate Pie recipe\n",
  tags: ["pie"],
  id: 176
});
index.add({
  title: "Google Font Explorer",
  category: "code",
  content: "See the Pen Google Font Explorer by Katy DeCorah (@katydecorah) on CodePen\n\nUpdate 9/12/2013 I received many requests on CodePen to make this pen its own page. So here is the Google Font Explorer!\n\nI love using Google Fonts. I know webfonts are a killer for web performance, but I can’t help myself. I tend to start designing something based on the font. I use ems as a unit for measure and for dictating proportions in my design. Call it process, call it whatever, I just love a good font.\n\nI am not a huge fan of the Google Font interface. For example, I never feel like I can accurately preview a font. I find myself having to try on different fonts on actual text outside of Google Fonts like I’m in a dressing room.\n\nI created the Google Font Explorer to find new fonts and test them out a little more accurately.\n\nI’m tapping into Google’s Font API to access all the font families data. You can type in a family to try it out. I used Bootstrap’s typeahead to help you find the font as you type. You can also click the randomize button to view a totally new font. You can edit the dummy or use the lorem ipsum text provided. Find out more about the family by clicking the information button. I also provided a history list in case you want to go back to a previously viewed family.\n",
  tags: ["Google Fonts","CodePen","API"],
  id: 177
});
index.add({
  title: "The Snow Hole",
  category: "adventures",
  content: "Awesome 2.7 mile hike to the Snow Hole in the Taconic Mountains. No snow in the hole, but we had a good time exploring inside and enjoying the temperature difference.\n\nI would definitely do this hike again!\n\n\n\n\n\n\n\n\n\n\n\n",
  tags: ["hiking","fresh air","recommended"],
  id: 178
});
index.add({
  title: "2013 Spring",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 179
});
index.add({
  title: "Western Mass Adventures",
  category: "adventures",
  content: "This weekend we woke up early and drove out to North Adams, Massachusetts. We took a 20-minute muddy hike through the woods and ended up at a waterfall.\n\n\n\n\n\n\nThe waterfall was set in two large embankments, which were not to be easily climbed. So we took off our shoes and carefully walked up the stream to the waterfall. The rocks were so smooth and the water cold. As we got closer the mist from the waterfall drenched us and the roar of the water vibrated our ears.\n\n\n\n\n\n\nWe left to find the train tunnel. Ate lunch at a Greek pizza shop in town and enjoyed whoopee pies at a local cafe.\n\n\n\n\n\n\n\nOn the way home, we climbed the Grafton fire tower. The view was spectacular.\n\n\n\n\n\n\nOn Sunday, I visited my parents. My mom and I went on a utility trail off of Blanchard Road in Wilton, NY. Toward the end, we found a trail into the woods (unadorned with POSTED signs).\n\n\n\n\n\n\n\n\nScattered thunderstorms ended any hope of taking the kayaks out, so we ran a few errands. My mom had seen some pictures in the local newspaper of a pond in a local cemetery with “unusual birds.” We drove over and found just that: a Chinese or African Goose (a domestic goose).\n\n\n\n\n\n",
  tags: ["waterfall","hiking","fresh air"],
  id: 180
});
index.add({
  title: "Line length-icator",
  category: "code",
  content: "See the Pen Line Length-icator by Katy DeCorah (@katydecorah) on CodePen\n\nI’m always trying to find the optimal line length for my text. After reading several posts, I found that the sweet spot is around 66 characters. While styling my paragraphs I started counting the characters manually. That got old, real fast.\n\nSo I created this little tool. Copy a paragraph and paste it into the box. It will automatically highlight the 66th character. You can adjust the character length to get a better feel for your readability. It will also tell you the width of the container to help you adjust your own CSS.\n\nLine Length-icator is also served on its own page.\n",
  tags: ["CodePen","Sass","jQuery","Haml","time travel"],
  id: 181
});
index.add({
  title: "New Bike",
  category: "notes",
  content: "I had a nice surprise from a certain someone today.\n\n\n\n\n",
  tags: ["bikes","yay","time travel"],
  id: 182
});
index.add({
  title: "Two Weddings",
  category: "adventures",
  content: "I had the distinct honor of being in two weddings this month.\n\n\n\n\n\n\n\n\nFor both weddings, I designed t-shirts for the bachelorette parties. The bride’s (below) is actually a giant nightie (this was her favorite garment in college) and she wore it while getting ready on the day.\n\n\n\n\n\n\nTwo straight weekends of friends, traveling, hotels, champagne, and good ole fashion dance offs.\n",
  tags: ["weddings","friends","time travel"],
  id: 183
});
index.add({
  title: "Hug O' War",
  category: "code",
  content: "See the Pen Rodeo 5 by Katy DeCorah (@katydecorah) on CodePen\n\nI came in second place during week one season two of the CodePen Rodeo!\n\nThe challenge was to typeset Shel Silverstein’s poem Hug O’ War using only typography and color.\n\nI knew I wanted my poem to be clean and easy to read, but I needed it to be secretly cute. For every fun verb or word (marked with a light dotted bottom border), I created a special CSS animation executed on hover. Giggles is my favorite!\n\nI thought it was really nice how many people came out to vote!\n",
  tags: ["CodePen","Sass","time travel"],
  id: 184
});
index.add({
  title: "Rensselaerville &amp; Granville",
  category: "adventures",
  content: "Rensselaerville\n\n\n\n\n\n\n\nGranville\n\n\n\n\n\n",
  tags: ["fresh air","time travel"],
  id: 185
});
index.add({
  title: "Combination lock",
  category: "code",
  content: "See the Pen Combination Lock by Katy DeCorah (@katydecorah) on CodePen\n\nI created a functioning combination lock.\n\nI provided the combination, but you need to resize your browser window to spin the dial. Don’t forget you spin right, left (pass the number once), and right again. (It’s much easier on CodePen and if you start with your browser relatively narrow.)\n\nEvery aspect was a challenge, but I loved it.\n\nI wrote the HTML in Haml, for the heck of it. I wanted to output the numbers without having to do it manually. It was cool figuring it out. I’m sure there is a more efficient way, but I’m still happily exploring.\n\nI used Hugo Giraudel’s mixin for putting items in a circle to position all the numbers. I think the trickiest part of the CSS was getting the gradients and shadows to look authentic. I did a lot of adjusting, experimenting, and asking the opinion of others before I settled on my recipe.\n\nThe jQuery was gnarly. I needed to know the width of the user’s browser at the start. From that value and the width of the lock, I created a specific ratio to be sure that the dial would spin proportionally. I calculated when the browser width would coincide with each combination number and added classes to the body to indicate when a success. Writing the jQuery took a lot of guessing, scribbling, and high school formulas, but I got it!\n",
  tags: ["CodePen","Sass","jQuery","Haml","time travel"],
  id: 186
});
index.add({
  title: "North Carolina",
  category: "adventures",
  content: "My sister moved to North Carolina a few years ago. Since then my folks and I make an annual trip down to visit.\n\nThis week is ceremoniously dedicated to eating a lot of food in between mom geocaching and then my sister and I binging on a tv series on Netflix. This year it was Bones.\n\nSnowflake\n\nMy sister’s cat terrifies me.\n\n\n\n\n\n\nPisgah Astronomical Research Institute\n\n\n\n\n\n\nThe North Carolina Arboretum\n\n\n\n\n\n\nBlowing Rock, NC\n\n\n\n\n\n\nPisgah National Forest\n\nWe fed the trout!\n\n\n\n\n\n\nFalls Park on the Reedy Greenville, SC\n\n\n\n\n\n\nBBQ\n\n\n\n\n\n\nLake Lure\n\n\n\n\n\n\nAppalachian State University\n\nMy sister is a middle school science teacher, so we picked up these hissing Madagascar cockroaches… on purpose.\n\n\n\n\n\n",
  tags: ["family","road trip","time travel"],
  id: 187
});
index.add({
  title: "Cookie Monster Cupcakes",
  category: "epicurean",
  content: "I made these cupcakes for a certain amazing person’s birthday!\n\n\n\n\n\n\n\nCookie monster cupcake recipe\n",
  tags: ["birthdays","cupcakes","time travel"],
  id: 188
});
index.add({
  title: "2012/2013 Winter",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 189
});
index.add({
  title: "Rennselaerville &amp; Thacher Park",
  category: "adventures",
  content: "We drove out for the day for some exploring. I scored this neat shot of Albany through a coin-operated binocular.\n\n\n\n\n\n",
  tags: ["fresh air","time travel"],
  id: 190
});
index.add({
  title: "Lake Placid",
  category: "adventures",
  content: "Traveled up to Lake Placid for the weekend with a college roommate, to visit our other college roommate. She had a nice birthday surprise waiting for me!\n\n\n\n\n\n\nWe lounged for the weekend, but we made sure to drive into Saranac Lake to see the ice castle.\n\n\n\n\n\n",
  tags: ["friends","birthdays","time travel"],
  id: 191
});
index.add({
  title: "Spring 2013, IINF 362",
  category: "teaching",
  content: "Today I start teaching Intermediate Web Development at the University at Albany.\n\n\n\n\n\nWhat they’ll learn:\n\n\n  Responsive Web Design\n  Accessibility\n  WordPress\n\n",
  tags: ["time travel"],
  id: 192
});
index.add({
  title: "Candy Sushi",
  category: "epicurean",
  content: "\n\n\n\nYou too can bring candy sushi magic to your home. Below is a basic write-up of what I did, but free-styling is encouraged.\n\nIngredients:\n\n  fruit roll-ups\n  Life Savers gummies, halved\n  Swedish Fish, halved\n  Rice Krispies treats\n\n\nInstructions:\n\n  Unravel a fruit roll-up and place on a plate.\n  Between two pieces of parchment paper flatten the Rice Krispie treat. Get it as flat as you can, without creating holes. Place flatten treat on top of the fruit roll-up. Try to trim excess so that the roll-up and treat match up.\n  Sprinkle candy along the center of the flatten treat, parallel to the longest edge of fruit roll-up/treat. Try to keep the candies in a line.\n  Grabbing the long edge of the fruit roll-up/treat, begin to roll towards the candy line. As you roll, try to carefully roll the candies in without breaking the fruit roll-up.\n  Once it’s rolled, cut the log into rounds.\n\n",
  tags: ["treats","time travel","recipe"],
  id: 193
});
index.add({
  title: "Sass adjust-hue reference",
  category: "code",
  content: "See the Pen Sass adjust-hue reference by Katy DeCorah (@katydecorah) on CodePen\n\nIf you have a color that you would like to adjust in Sass, but don’t feel like guess and checking, then try out this little tool.\n\nEdit the color in the SCSS and the boxes will populate appropriately, providing the correct degree. Hover over the box and it will reveal the hex.\n",
  tags: ["Sass","CodePen","time travel","Haml"],
  id: 194
});
index.add({
  title: "Double vision",
  category: "code",
  content: "See the Pen Double Vision by Katy DeCorah (@katydecorah) on CodePen\n\nSingle element, lots of text-shadow.\n",
  tags: ["CodePen","text-shadow","Sass","Slim","time travel"],
  id: 195
});
index.add({
  title: "New Years Eve Homemade Sushi",
  category: "notes",
  content: "\n\n\n\nThis year we stayed in, rolled our own sushi, and fell asleep before midnight. It was my favorite.\n",
  tags: ["family","time travel"],
  id: 196
});
index.add({
  title: "2012 Fall",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 197
});
index.add({
  title: "2012 Summer",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 198
});
index.add({
  title: "Fall 2012, IIST 361",
  category: "teaching",
  content: "Today I start teaching Web Development at the University at Albany.\n\nWhat they’ll learn:\n\n\n  HTML5\n  CSS\n  Dreamweaver\n  Photoshop\n  JavaScript/jQuery\n\n",
  tags: ["time travel"],
  id: 199
});
index.add({
  title: "2012 Spring",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 200
});
index.add({
  title: "2011/2012 Winter",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 201
});
index.add({
  title: "Spring 2012, IIST 361",
  category: "teaching",
  content: "Today I start teaching Web Development at the University at Albany.\n\nWhat they’ll learn:\n\n\n  HTML5\n  CSS\n  Dreamweaver\n  Photoshop\n  JavaScript/jQuery\n\n",
  tags: ["time travel"],
  id: 202
});
index.add({
  title: "2011 Fall",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 203
});
index.add({
  title: "2011 Summer",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 204
});
index.add({
  title: "Fall 2011, IIST 361",
  category: "teaching",
  content: "Today I start teaching Web Development at the University at Albany.\n\nWhat they’ll learn:\n\n\n  HTML5\n  CSS\n  Dreamweaver\n  Photoshop\n  JavaScript/jQuery\n\n",
  tags: ["time travel"],
  id: 205
});
index.add({
  title: "2011 Spring",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 206
});
index.add({
  title: "2010/2011 Winter",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 207
});
index.add({
  title: "2010 Fall",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 208
});
index.add({
  title: "2010 Summer",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 209
});
index.add({
  title: "2010 Spring",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 210
});
index.add({
  title: "Ireland & Spain",
  category: "adventures",
  content: "My friend was wrapping up her Masters in Dublin, so I visited, along with another friend for two weeks. We hopped over to Spain for some quick sightseeing.\n\nDublin\n\nKilmainham Gaol\n\n\n\n\n\n\n\n\n\n\n\nMadrid\n\nCatedral De La Almudena\n\n\n\n\n\n\n\n\n\n\n\n\nPalacio Real\n\n\n\n\n\n\n\n\n\n\nAround Madrid\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBarcelona\n\nLa Sagrada Familia\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nAround Barcelona\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPark Güell\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nDublin\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nCobh\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nBlarney\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  tags: ["friends","time travel"],
  id: 211
});
index.add({
  title: "2009/2010 Winter",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 212
});
index.add({
  title: "2009 Fall",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 213
});
index.add({
  title: "2009 Summer",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 214
});
index.add({
  title: "2009 Spring",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 215
});
index.add({
  title: "Turkey & Greece",
  category: "adventures",
  content: "At Siena, I took a business and ancient Greece course. At the end of the semester we visited Turkey and Greece.\n\n(After I took this trip, I didn’t organize these photos very well. So some of these are guesses.)\n\nDelphi is :heart_eyes_cat:.\n\nIstanbul\n\nSultan Ahmed Mosque\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nSüleymaniye Mosque\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nAround Istanbul\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nYerebatan Sarnici\n\n\n\n\n\n\n\n\n\n\n\n\n\nTopkapi Sarayi\n\n\n\n\n\nHagia Sofia\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nTroy\n\n\n\n\n\n\n\n\n\n\n\n\n\nÇanakkale\n\n\n\n\n\n\n\n\n\nPergamon\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nIzmir\n\nEphesus\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nKusadasi\n\n\n\n\n\n\n\n\n\nCrete\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nKnossos\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nSantorini\n\n\n\n\n\n\n\n\n\n\nAthens\n\nAcropolis\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nAround Athens\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nDelphi\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  tags: ["college","time travel"],
  id: 216
});
index.add({
  title: "2009 Winter",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 217
});
index.add({
  title: "The Risorgimento",
  category: "adventures",
  content: "At Siena, I took a course called The Risorgimento. We studied Italian unification and then visited the sites during the semester.\n\nRome\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nFlorence\n\n\n\n\n\n\n\n\n\n\n\n\nTurin\n\n\n\n\n\n\n\n\nLake Como\n\n\n\n\n\n\n\n",
  tags: ["college","time travel"],
  id: 218
});
index.add({
  title: "2008 Fall",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 219
});
index.add({
  title: "2008 Summer",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 220
});
index.add({
  title: "2008 Spring",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 221
});
index.add({
  title: "Roman Britain",
  category: "adventures",
  content: "At Siena, I took a course called Roman Britain, where we studied the Romanization of Britain. At the end of the semester we visited the sites.\n\nHadrian’s Wall\n\n\n\n\n\n\n\n\nCawfield Milecastle\n\n\n\n\n\n\nVindolanda\n\n\n\n\n\n\n\n\nChesters Roman Fort\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nArbeia\n\n\n\n\n\n\n\n\nAngel of the North\n\n\n\n\n\n\nShrewsbury\n\n\n\n\n\n\nWroxeter\n\n\n\n\n\n\n\n\nCaerleon\n\n\n\n\n\n\n\n\nCaerwent\n\n\n\n\n\n\n\n\nBath\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nChedworth\n\n\n\n\n\n\n\n\n\n\nStonehenge\n\n\n\n\n\n\n\n\n\n\nFishbourne\n\n\n\n\n\n\n\n\n\n\ncagreen\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  tags: ["college","time travel"],
  id: 222
});
index.add({
  title: "2004-2005",
  category: "playlists",
  content: "\n",
  tags: ["time travel"],
  id: 223
});
index.add({
  title: "Bermuda",
  category: "adventures",
  content: "One of the perks of being a Girl Scout is the senior Bermuda trip.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  tags: ["trips","friends","time travel"],
  id: 224
});
console.log( jQuery.type(index) );
// builds reference data
var store = [{
  "title": "Collate Google Form responses into Google Docs",
  "link": "/code/spreadsheet-collator/",
  "image": "https://c1.staticflickr.com/5/4607/27955743299_c8ae637d85_o.png",
  "date": "January 16, 2018",
  "category": "code",
  "excerpt": "For Ela Conf 2016 and 2017, we created a Google Form to collect speaker feedback. The form had the following..."
},{
  "title": "Create emails from a Google spreadsheet",
  "link": "/code/google-sheets-to-gmail/",
  "image": "https://c1.staticflickr.com/5/4768/39734525941_5bb0529aa6_o.png",
  "date": "January 6, 2018",
  "category": "code",
  "excerpt": "For this past Ela Conf, we had a record number of proposals submitted, which also (unfortunately) meant a record number..."
},{
  "title": "AwayBot, an out of office helper",
  "link": "/code/awaybot/",
  "image": "https://c1.staticflickr.com/5/4633/38669932694_b4b84cbcf0_b.jpg",
  "date": "December 29, 2017",
  "category": "code",
  "excerpt": "I made a command line tool to run when I go into labor, AwayBot. This bot can also be used..."
},{
  "title": "2017 Fall",
  "link": "/playlists/2017/fall/",
  "image": "/img/playlists/2017-fall.png",
  "date": "December 21, 2017",
  "category": "playlists",
  "excerpt": "Listen on Spotify Half Hour, Yumi Zouma Holy Holy, Wye Oak Orca, Y La Bamba Gassed, WESLEE Too Dark, Frankie..."
},{
  "title": "LIFX + AWS IoT Button",
  "link": "/code/lifx/",
  "image": "https://c1.staticflickr.com/5/4642/39116460051_8a539ec2a4.jpg",
  "date": "December 17, 2017",
  "category": "code",
  "excerpt": "When our son is born next year, we’re anticipating late night feedings and diapers changes which may mean needing to..."
},{
  "title": "2017 Summer",
  "link": "/playlists/2017/summer/",
  "image": "/img/playlists/2017-summer.png",
  "date": "September 20, 2017",
  "category": "playlists",
  "excerpt": "Listen on Spotify Bassically, Tei Shi 4:00 AM, Sorcha Richardson Please, Rhye The Wheel, SOHN Slop, Forth Wanderers Asido, Purity..."
},{
  "title": "2017 Spring",
  "link": "/playlists/2017/spring/",
  "image": "/img/playlists/2017-spring.png",
  "date": "June 20, 2017",
  "category": "playlists",
  "excerpt": "Listen on Spotify Kitty Kat, Empress Of Visions of Old, Kelsey Lu Chemicals, Rosemary Fairweather How Far, Tei Shi For..."
},{
  "title": "Building a ChillBot",
  "link": "/code/chillbot/",
  "image": "https://c1.staticflickr.com/3/2868/33888774410_b8f238795f_o.png",
  "date": "May 9, 2017",
  "category": "code",
  "excerpt": "I wrote Keep your streak in the work week on The Human In The Machine today. My article is about..."
},{
  "title": "2016/2017 Winter",
  "link": "/playlists/2017/winter/",
  "image": "/img/playlists/2016-2017-winter.png",
  "date": "March 20, 2017",
  "category": "playlists",
  "excerpt": "Listen on Spotify All, Katie Dey Sutphin Boulevard, Blood Orange Big Sis, Sales Trophies for Paradox, Braids Tea Lights, Lower..."
},{
  "title": "WeatherBot gets alerts",
  "link": "/code/weatherbot-gets-alerts/",
  "image": "https://c2.staticflickr.com/4/3955/32422791034_428c7775ee_o.png",
  "date": "March 5, 2017",
  "category": "code",
  "excerpt": "I didn’t expect WeatherBot to become a series of posts, but the weather has been fluctuating so much scary. WeatherBot..."
},{
  "title": "WeatherBot goes outside",
  "link": "/code/weatherbot-goes-outside/",
  "image": "https://c1.staticflickr.com/1/584/33134069845_e0d27177f0_z.jpg",
  "date": "March 1, 2017",
  "category": "code",
  "excerpt": "Last week I talked about how I built a WeatherBot that gives us a heads up if there will be..."
},{
  "title": "Building a WeatherBot",
  "link": "/code/weatherbot/",
  "image": "https://c1.staticflickr.com/3/2719/32935597221_eef6641328_b.jpg",
  "date": "February 22, 2017",
  "category": "code",
  "excerpt": "We live in Upstate New York so there’s snow and it’s kind of pain for J to plow the driveway..."
},{
  "title": "Grand Canyon",
  "link": "/adventures/grand-canyon/",
  "image": "https://c1.staticflickr.com/1/775/32546630091_c35182c236_h.jpg",
  "date": "February 12, 2017",
  "category": "adventures",
  "excerpt": "To celebrate my birthday (and to mitigate cabin fever), J and I headed to the Grand Canyon. Hoover Dam We..."
},{
  "title": "2016 Fall",
  "link": "/playlists/2016/fall/",
  "image": "/img/playlists/2016-fall.png",
  "date": "December 21, 2016",
  "category": "playlists",
  "excerpt": "Listen on Spotify Call Me in the Day, La Luz You’re Out Wasting, Andy Shauf Etiquette, Land Lines Used to..."
},{
  "title": "Getaway in the Catskills",
  "link": "/adventures/getaway/",
  "image": "https://c1.staticflickr.com/9/8631/30350234041_835afb4afc_b.jpg",
  "date": "October 19, 2016",
  "category": "adventures",
  "excerpt": "We spent (a very relaxing) two days in a tiny house in the woods. We read books, napped, hiked, made..."
},{
  "title": "How to get married at an Airbnb",
  "link": "/notes/get-married-airbnb/",
  "image": "https://c2.staticflickr.com/6/5697/30011820675_1afe36b9f6_b.jpg",
  "date": "October 1, 2016",
  "category": "notes",
  "excerpt": "On Saturday, June 18, Jason and I were married at an Airbnb on the side of a mountain near Manchester,..."
},{
  "title": "Becoming an Outdoors-Woman 2016",
  "link": "/adventures/bow-2016/",
  "image": "https://c1.staticflickr.com/9/8508/29196073224_3c04046715_c.jpg",
  "date": "September 20, 2016",
  "category": "adventures",
  "excerpt": "My mom and I attended the Becoming an Outdoors-Woman workshop again, this year at Greek Peak outside of Cortland, New..."
},{
  "title": "2016 Summer",
  "link": "/playlists/2016/summer/",
  "image": "/img/playlists/2016-summer.png",
  "date": "September 20, 2016",
  "category": "playlists",
  "excerpt": "Listen on Spotify Special Affair, The Internet With Me, dvsn Cherry Tree, Xenia Rubinos Lazy Jane, Jenny O. Devil Like..."
},{
  "title": "Organizing a conference with bots",
  "link": "/notes/ela-conf-bots/",
  "image": "https://cloud.githubusercontent.com/assets/2180540/17576600/6ad2076e-5f42-11e6-8b3a-d2ca29823192.png",
  "date": "August 10, 2016",
  "category": "notes",
  "excerpt": "Last year, Ela Conf organizers and I relied on Google Forms for women to submit anything from talks to volunteer..."
},{
  "title": "2016 Spring",
  "link": "/playlists/2016/spring/",
  "image": "/img/playlists/2016-spring.png",
  "date": "June 20, 2016",
  "category": "playlists",
  "excerpt": "Listen on Spotify Cavity, Hundred Waters Never Be Like You (feat. Kai), Flume Kai Smalltalk - Four Tet Remix, Ultraísta..."
},{
  "title": "What I learned after working remotely for 2 years",
  "link": "/notes/two-years-remote/",
  "image": "https://c2.staticflickr.com/8/7425/26934340133_47aef85887.jpg",
  "date": "June 8, 2016",
  "category": "notes",
  "excerpt": "I have entered my terrible terrific twos of working remotely. Working from yoga pants. Working from couch. Working from over..."
},{
  "title": "The farm",
  "link": "/adventures/katys-ladies/",
  "image": "https://c8.staticflickr.com/8/7423/27288697511_2554a94bdb_b.jpg",
  "date": "May 30, 2016",
  "category": "adventures",
  "excerpt": "My Mapbox squad threw me a bachelorette party in the woods. We relaxed, hiked, ate, drank, and danced. And we..."
},{
  "title": "Unconventional use cases for Jekyll",
  "link": "/code/jekyllconf/",
  "image": "https://c2.staticflickr.com/8/7139/26297512494_2481e215ba_z.jpg",
  "date": "May 8, 2016",
  "category": "code",
  "excerpt": "Yesterday, I had the pleasure of speaking at JekyllConf. My talk, Unconventional use cases for Jekyll, is a love story..."
},{
  "title": "2015/2016 Winter",
  "link": "/playlists/2016/winter/",
  "image": "http://katydecorah.com/img/playlists/2015-2016-winter.png",
  "date": "March 21, 2016",
  "category": "playlists",
  "excerpt": "Listen on Spotify Nightcall, Kavinsky + Lovefoxxx Fitzpleasure, alt-J Ch-Ching, Chairlift Easy Easy, King Krule Levitation, Beach House Dopamine, DIIV..."
},{
  "title": "Plotters Kill Preserve",
  "link": "/adventures/plotters-kill/",
  "image": "https://farm2.staticflickr.com/1539/25642502930_f86da88069_b.jpg",
  "date": "March 20, 2016",
  "category": "adventures",
  "excerpt": "We hiked around Plotters Kill Preserve](http://www.alltrails.com/trail/us/new-york/plotter-kill-preserve) by starting on the blue trail. The blue trail is nice, but has limited..."
},{
  "title": "X-Files for every occasion",
  "link": "/notes/x-files/",
  "image": "https://cloud.githubusercontent.com/assets/2180540/12061090/83e195aa-af4b-11e5-9e21-d8db1f363f69.jpg",
  "date": "January 9, 2016",
  "category": "notes",
  "excerpt": "I love the X-Files and to celebrate the new season I created a list of episodes that I think about..."
},{
  "title": "Bozen Kill Preserve",
  "link": "/adventures/bozen-kill-preserve/",
  "image": "https://farm6.staticflickr.com/5749/23857257910_33919392ec_b.jpg",
  "date": "January 3, 2016",
  "category": "adventures",
  "excerpt": "Today we hiked Bozen Kill Preserve in Altamont. It was muddy, icy, and even muddy-icy combo, but it’s a lovely..."
},{
  "title": "2015 Fall",
  "link": "/playlists/2015/fall/",
  "image": "http://katydecorah.com/img/playlists/2015-fall.png",
  "date": "December 21, 2015",
  "category": "playlists",
  "excerpt": "Listen on Rdio Listen on Spotify This Is The Last Time, The National Balance, Future Islands Necessary Evil, Unknown Mortal..."
},{
  "title": "ELA Conf",
  "link": "/notes/ela-conf/",
  "image": "https://cloud.githubusercontent.com/assets/2180540/11353591/82c9893a-9212-11e5-954e-3af8bb72f566.jpg",
  "date": "November 23, 2015",
  "category": "notes",
  "excerpt": "Earlier this year, Joni Trythall retweeted something about a new tech conference, ELA Conf, to empower women to pursue leadership..."
},{
  "title": "Symlinking Jekyll data files",
  "link": "/code/symlinking-jekyll-data/",
  "image": "https://farm6.staticflickr.com/5157/14278201486_25b78eef45_o.png",
  "date": "October 14, 2015",
  "category": "code",
  "excerpt": "Font Library has delicious data packed into a JSON file. I’ve had an urge to see how else I can..."
},{
  "title": "VT to NH to ME",
  "link": "/adventures/to-vt-to-nh-to-me/",
  "image": "https://farm6.staticflickr.com/5796/21821887349_032d9c2f1f_b.jpg",
  "date": "October 9, 2015",
  "category": "adventures",
  "excerpt": "We took a three-night drive through New England with help from Hotel Tonight. Burlington, VT Jeffersonville, VT Bingham Falls, VT..."
},{
  "title": "Becoming an Outdoors-Woman",
  "link": "/adventures/bow/",
  "image": "https://farm1.staticflickr.com/694/21320458634_11d3fd8372_b.jpg",
  "date": "October 4, 2015",
  "category": "adventures",
  "excerpt": "This weekend my mom and I had the pleasure of attending the Becoming an Outdoors-Woman workshop at Silver Bay. BOW..."
},{
  "title": "2015 Summer",
  "link": "/playlists/2015/summer/",
  "image": "http://katydecorah.com/img/playlists/2015-summer.png",
  "date": "September 23, 2015",
  "category": "playlists",
  "excerpt": "Listen on Rdio Rosie, Lower Dens Feels Like We Only Go Backwards, Tame Impala Master Of None, Beach House Pure..."
},{
  "title": "Adirondack Balloon Festival 2015",
  "link": "/adventures/adirondack-balloon-festival-2015/",
  "image": "https://farm6.staticflickr.com/5690/21354685839_d98746f6f1_b.jpg",
  "date": "September 20, 2015",
  "category": "adventures",
  "excerpt": "Yesterday morning mom and I woke up at 4:45 to catch the morning launch.\n\n\n\n\n\n\n\n\n\n   \n\n\n\n\n\n \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
},{
  "title": "South Yokun Ridge",
  "link": "/adventures/south-yokun-ridge/",
  "image": "https://farm1.staticflickr.com/567/20552818663_bd6e380450_b.jpg",
  "date": "September 5, 2015",
  "category": "adventures",
  "excerpt": "Today we visited Olivia’s Overlook and then hiked the South Yokun Ridge in Stockbridge, Massachusetts.\n\n\n\n\n\n"
},{
  "title": "Kings Highway Barrens",
  "link": "/adventures/kings-highway-barrens/",
  "image": "https://farm6.staticflickr.com/5638/20798363136_83ccf40d39_b.jpg",
  "date": "August 23, 2015",
  "category": "adventures",
  "excerpt": "We crossed trail #9 of the Albany Pine Bush Preserve off the list :ok_hand:.\n\n\n\n\n\n\n\n\n\n"
},{
  "title": "lunr.js and Jekyll",
  "link": "/code/lunr-and-jekyll/",
  "image": "https://farm6.staticflickr.com/5157/14278201486_25b78eef45_o.png",
  "date": "August 15, 2015",
  "category": "code",
  "excerpt": "I recently spent some time hooking up a Jekyll site with lunr.js. Lunr.js is a full text client-side search engine..."
},{
  "title": "Normanskill Farm Bridge",
  "link": "/adventures/normanskill-farm-bridge/",
  "image": "https://farm1.staticflickr.com/385/20223211818_4905e6a077_b.jpg",
  "date": "August 8, 2015",
  "category": "adventures",
  "excerpt": "We visited the Normanskill Farm Bridge, also known as the Whipple Cast and Wrought Iron Bowstring Truss Bridge and took..."
},{
  "title": "Round Lake Preserve",
  "link": "/adventures/round-lake-preserve/",
  "image": "https://farm1.staticflickr.com/525/18832607123_9f6df1a44a_b.jpg",
  "date": "July 5, 2015",
  "category": "adventures",
  "excerpt": "\n\n\n\n\n\n"
},{
  "title": "2015 Spring",
  "link": "/playlists/2015/spring/",
  "image": "http://katydecorah.com/img/playlists/2015-spring.png",
  "date": "June 20, 2015",
  "category": "playlists",
  "excerpt": "Listen on Rdio Time to Go Home, Chastity Belt IDC, Chastity Belt Everything New, No Joy Pirates Cove, Coasting Trust..."
},{
  "title": "What I learned after working remote for 1 year",
  "link": "/notes/one-year-remote/",
  "image": "https://c1.staticflickr.com/1/448/18664258796_988f31b102_c.jpg",
  "date": "June 19, 2015",
  "category": "notes",
  "excerpt": "Shower and change your clothes frequently (or daily even) Your significant other (who also works from home) isn’t your coworker..."
},{
  "title": "Schodack Island State Park",
  "link": "/adventures/schodack-state-park/",
  "image": "https://farm9.staticflickr.com/8854/18001503574_3cbe35ecd9_b.jpg",
  "date": "June 7, 2015",
  "category": "adventures",
  "excerpt": "\n\n\n\n\n\n\n\n"
},{
  "title": "Iceland",
  "link": "/adventures/iceland/",
  "image": "https://c2.staticflickr.com/8/7732/17830222499_b36c366db1_b.jpg",
  "date": "June 2, 2015",
  "category": "adventures",
  "excerpt": "We spent 10 amazing days in Iceland, here’s our journey. Reykjavík We kicked it off in Reykjavík and walked all..."
},{
  "title": "yay.md",
  "link": "/notes/yay.md/",
  "image": "https://farm8.staticflickr.com/7611/17078365030_ed158bdc4f_c.jpg",
  "date": "April 25, 2015",
  "category": "notes",
  "excerpt": "I keep a gist named yay.md. A secret, never shared and don’t plan to, gist. It’s where I keep screenshots..."
},{
  "title": "Thunder Mountain",
  "link": "/adventures/thunder-mountain/",
  "image": "https://farm6.staticflickr.com/5450/16583180214_ff0339c6a6_b.jpg",
  "date": "April 19, 2015",
  "category": "adventures",
  "excerpt": "Mom and I did the 1.3 mile hike around Thunder Mountain in Greenwich today. And then we took the scenic..."
},{
  "title": "San Francisco all weekend",
  "link": "/adventures/san-francisco-all-weekend/",
  "image": "https://farm8.staticflickr.com/7589/17107363276_e9950eff4c_b.jpg",
  "date": "April 13, 2015",
  "category": "adventures",
  "excerpt": "I worked out of the SF Mapbox office last week and then hung around for the weekend. Adventure was had..."
},{
  "title": "Breathe with your stomach",
  "link": "/notes/breathe-with-your-stomach/",
  "image": "https://farm9.staticflickr.com/8715/16783493748_4db30df288_o.png",
  "date": "March 29, 2015",
  "category": "notes",
  "excerpt": "A couple months ago, I was chewing on an idea for a slide for my FOSS4GNA talk and I needed..."
},{
  "title": "Writing for everyone",
  "link": "/code/writing-for-everyone/",
  "image": "https://farm8.staticflickr.com/7612/16606351737_721e54516d_c.jpg",
  "date": "March 25, 2015",
  "category": "code",
  "excerpt": "A couple weeks ago I gave my talk Writing for everyone at FOSS4G NA. I had a great time! You..."
},{
  "title": "2014/2015 Winter",
  "link": "/playlists/2015/winter/",
  "image": "http://katydecorah.com/img/playlists/2014-2015-winter.png",
  "date": "March 20, 2015",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "The bird feeder",
  "link": "/notes/the-bird-feeder/",
  "image": "https://farm8.staticflickr.com/7454/15809852324_a5e4233b62_b.jpg",
  "date": "March 18, 2015",
  "category": "notes",
  "excerpt": "Swoosh. Plunk. Flick. Flick. Flickflick. Tap. Taptaptaptaptap. Swoosh. All morning. A pair of cardinals and a bluejay also frequent the..."
},{
  "title": "San Francisco real quick",
  "link": "/adventures/san-francisco-real-quick/",
  "image": "https://farm8.staticflickr.com/7653/16601605307_844e26a063_h.jpg",
  "date": "March 14, 2015",
  "category": "adventures",
  "excerpt": "I was in Burlingame and San Francisco this past week for FOSS4G NA. Slides and video to come, but for..."
},{
  "title": "Showshoeing in Rensselaerville",
  "link": "/adventures/showshoeing/",
  "image": "https://farm9.staticflickr.com/8620/16560634908_0b0f932b48_h.jpg",
  "date": "March 7, 2015",
  "category": "adventures",
  "excerpt": "The best way down the hill is on your belly, like a penguin.\n\n\n\n \n\n\n\n\n\n\n\n\n\n\n"
},{
  "title": "Sleep Pajamas and Work Pajamas",
  "link": "/code/sleep-pajamas-work-pajamas/",
  "image": "https://farm9.staticflickr.com/8615/16536671800_8a0a3d88bd_b.jpg",
  "date": "March 4, 2015",
  "category": "code",
  "excerpt": "A year later, I’m back chatting with Tim: Tim talks with Katy DeCorah about moving jobs, working at Mapbox, working..."
},{
  "title": "Weaving data into GeoJSON with Jekyll",
  "link": "/code/weaving-geojson/",
  "image": "https://farm9.staticflickr.com/8594/15981508984_a398d1fa77_b.jpg",
  "date": "February 21, 2015",
  "category": "code",
  "excerpt": "Say you have a dataset for a handful of countries or all the countries, or maybe a handful of states..."
},{
  "title": "Seasonal posts",
  "link": "/code/seasonal-posts/",
  "image": "https://farm9.staticflickr.com/8679/16397459852_eff661fed3_o.png",
  "date": "January 29, 2015",
  "category": "code",
  "excerpt": "After flipping through past posts, I realized that my lush green static map didn’t match wintery posts. For example, Christmas..."
},{
  "title": "Frozen Papscanee Preserve",
  "link": "/adventures/frozen-papscanee-preserve/",
  "image": "https://farm8.staticflickr.com/7379/16168820338_4326fe2492_h.jpg",
  "date": "January 24, 2015",
  "category": "adventures",
  "excerpt": "The trail was a sheet of ice, but a pretty sheet of ice.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
},{
  "title": "Williamstown",
  "link": "/adventures/williamstown/",
  "image": "https://farm8.staticflickr.com/7549/16224361846_cb3c370661_c.jpg",
  "date": "January 10, 2015",
  "category": "adventures",
  "excerpt": "Or, how we beat cabin fever by fleeing cold New York for cold Massachusetts for one night. Because the hotel..."
},{
  "title": "From Haml to Yaml",
  "link": "/code/from-haml-to-yaml/",
  "image": "https://farm6.staticflickr.com/5157/14278201486_25b78eef45_o.png",
  "date": "December 30, 2014",
  "category": "code",
  "excerpt": "Way back in May, I built a pen based on MDN’s article to visualize and compare all CSS lengths. Here’s..."
},{
  "title": "Christmas day hike",
  "link": "/adventures/christmas-hike/",
  "image": "https://farm8.staticflickr.com/7462/15591018173_429aed423d_c.jpg",
  "date": "December 25, 2014",
  "category": "adventures",
  "excerpt": "A morning hike at the Papscanee Island Nature Preserve.\n\n\n\n \n\n\n\n\n\n\n \n\n\n\n \n\n\n"
},{
  "title": "2014 Fall",
  "link": "/playlists/2014/fall/",
  "image": "http://katydecorah.com/img/playlists/2014-fall.png",
  "date": "December 21, 2014",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Snowflaker",
  "link": "/code/snowflaker/",
  "image": "http://i.imgur.com/yNv3nmo.gif",
  "date": "December 19, 2014",
  "category": "code",
  "excerpt": "See the Pen Snowflaker by Katy DeCorah (@katydecorah) on CodePen. I really wanted to build something last night, heck, something..."
},{
  "title": "San Francisco",
  "link": "/adventures/san-francisco/",
  "image": "https://farm8.staticflickr.com/7568/15400931074_51ac98e1c8_c.jpg",
  "date": "December 15, 2014",
  "category": "adventures",
  "excerpt": "I spent last week working out of the Mapbox San Francisco office.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nSuch an awesome week.\n"
},{
  "title": "New York City",
  "link": "/adventures/nyc/",
  "image": "https://farm9.staticflickr.com/8616/15994854232_eea6f7a6f7_c.jpg",
  "date": "November 22, 2014",
  "category": "adventures",
  "excerpt": "Took the 6:15 AM train to Penn Station with a friend. Walked around, saw the Christmas show, had a delicious..."
},{
  "title": "Jekyll and GeoJSON",
  "link": "/code/jekyll-geojson/",
  "image": "https://farm6.staticflickr.com/5157/14278201486_25b78eef45_o.png",
  "date": "November 3, 2014",
  "category": "code",
  "excerpt": "Add this post to my love-affair-with-Jekyll-and-Mapbox series. A cool thing happens To summon Jekyll to a page, you use those..."
},{
  "title": "How I write",
  "link": "/notes/how-i-write/",
  "image": "https://cloud.githubusercontent.com/assets/2180540/4868004/fed98df4-613a-11e4-9950-f67d1bad8999.gif",
  "date": "October 31, 2014",
  "category": "notes",
  "excerpt": "This is a devlog I wrote at Mapbox that inspired my talk Writing for everyone. …I thought I’d share some..."
},{
  "title": "Great Dune",
  "link": "/adventures/great-dune/",
  "image": "https://farm6.staticflickr.com/5601/15675124791_179e7b979c_h.jpg",
  "date": "October 26, 2014",
  "category": "adventures",
  "excerpt": "A very fall hike with an old friend on trailhead 8 (Great Dune) of the Albany Pine Bush.\n\n\n\n \n\n\n"
},{
  "title": "Vroman’s Nose",
  "link": "/adventures/vromans-nose/",
  "image": "https://farm6.staticflickr.com/5615/15625478445_3bc127d476_h.jpg",
  "date": "October 25, 2014",
  "category": "adventures",
  "excerpt": "Today we hiked up to Vroman’s Nose. Then had an awesome lunch at Middleburgers BBQ and picked up a half..."
},{
  "title": "Half Share",
  "link": "/notes/fox-creek-farm/",
  "image": "https://farm4.staticflickr.com/3849/15007874310_df37d39893_z.jpg",
  "date": "October 21, 2014",
  "category": "notes",
  "excerpt": "We enjoyed 20 weeks of the Fox Creek Farm CSA. We missed week 17 and week 19 due to adventures..."
},{
  "title": "Elizabethtown II",
  "link": "/adventures/elizabethtown-II/",
  "image": "https://farm6.staticflickr.com/5614/14958042803_896839aac9_b.jpg",
  "date": "October 19, 2014",
  "category": "adventures",
  "excerpt": "A college roommates weekend in Elizabethtown. A weekend way over due. Whiskey, pumpkin carving, wine tasting, hot tubs, mulled wine,..."
},{
  "title": "Rhode Island",
  "link": "/adventures/rhode-island/",
  "image": "https://farm6.staticflickr.com/5597/15246045327_c2c1d9382f_b.jpg",
  "date": "October 3, 2014",
  "category": "adventures",
  "excerpt": "We spent last weekend in Newport and the start of the week in Providence, Rhode Island. Lobster rolls, ocean air,..."
},{
  "title": "2014 Summer",
  "link": "/playlists/2014/summer/",
  "image": "http://katydecorah.com/img/playlists/2014-summer.png",
  "date": "September 21, 2014",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Adirondack Balloon Festival 2014",
  "link": "/adventures/adirondack-balloon-festival-II/",
  "image": "https://farm4.staticflickr.com/3903/15297564342_643dc19a0e_b.jpg",
  "date": "September 20, 2014",
  "category": "adventures",
  "excerpt": "Wake up at 3:45 am. Drive to Glens Falls. Take the 5:10 city bus to the airport. Arrive at airport..."
},{
  "title": "DRY Yaml",
  "link": "/code/dry-yaml/",
  "image": "https://farm6.staticflickr.com/5157/14278201486_25b78eef45_o.png",
  "date": "September 2, 2014",
  "category": "code",
  "excerpt": "For the class that I’m teaching this Fall, I created a Jekyll site to hold the course materials. I’m in..."
},{
  "title": "Kaaterskill Falls",
  "link": "/adventures/kaaterskill-falls/",
  "image": "https://farm6.staticflickr.com/5581/14911237709_d4b495b1fd_b.jpg",
  "date": "September 1, 2014",
  "category": "adventures",
  "excerpt": "This weekend we visited our families, ate a ton a food, and hiked to Kaaterskill Falls in the Catskills.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
},{
  "title": "Fall 2014, IINF 362",
  "link": "/teaching/2014/fall/",
  "image": "https://farm6.staticflickr.com/5157/14278201486_25b78eef45_o.png",
  "date": "August 26, 2014",
  "category": "teaching",
  "excerpt": "Today I start teaching Intermediate Interactive Design at the University at Albany. What they’ll learn: Github Responsive Web Design Jekyll..."
},{
  "title": "Two years ago on CodePen",
  "link": "/code/two-years-ago/",
  "image": "https://farm6.staticflickr.com/5559/14938075432_af54665e34_o.png",
  "date": "August 26, 2014",
  "category": "code",
  "excerpt": "Two years ago on CodePen I was picked for the first time ever. I know this because I found a..."
},{
  "title": "Five Rivers",
  "link": "/adventures/five-rivers/",
  "image": "https://farm4.staticflickr.com/3848/14921822548_e64c69c350_b.jpg",
  "date": "August 24, 2014",
  "category": "adventures",
  "excerpt": "This weekend we explored Five Rivers in Delmar.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
},{
  "title": "columns",
  "link": "/code/columns/",
  "image": "https://farm6.staticflickr.com/5592/14543209080_9ee6952be0_o.jpg",
  "date": "August 15, 2014",
  "category": "code",
  "excerpt": "After writing the Guide to Responsive-Friendly CSS Columns on CSS-Tricks, I was invited back to write up an Almanac post..."
},{
  "title": "Cascade Falls",
  "link": "/adventures/cascade-falls/",
  "image": "https://farm4.staticflickr.com/3875/14890721083_7f26e13599_b.jpg",
  "date": "August 10, 2014",
  "category": "adventures",
  "excerpt": "Yesterday morning we work up early and drove out to North Adams to explore Cascade Falls once again. On the..."
},{
  "title": "A case for :empty",
  "link": "/code/case-for-empty/",
  "image": "https://farm6.staticflickr.com/5588/14429683600_f7f828069a_o.png",
  "date": "July 30, 2014",
  "category": "code",
  "excerpt": "At work today, I’m styling an app. The code is automatically generated, making me a CSS jockey. It can be..."
},{
  "title": "Pine Hollow Arboretum",
  "link": "/adventures/pine-hollow-arboretum/",
  "image": "https://farm3.staticflickr.com/2918/14771854853_f283db09ba_b.jpg",
  "date": "July 27, 2014",
  "category": "adventures",
  "excerpt": "Yesterday we visited the Pine Hollow Arboretum in Slingerlands. We saw the sign for the arboretum during one of our..."
},{
  "title": "Static Mapbox API for Jekyll posts",
  "link": "/code/static-mapbox-for-jekyll/",
  "image": "https://farm6.staticflickr.com/5571/14562967428_1bd555644c_o.png",
  "date": "July 26, 2014",
  "category": "code",
  "excerpt": "I’ve done Static Google Maps Image for Jekyll Posts, Mapbox for Jekyll Posts, but it’s time to settle down. I’m..."
},{
  "title": "Guide to Responsive-Friendly CSS Columns",
  "link": "/code/guide-to-css-columns/",
  "image": "https://farm6.staticflickr.com/5592/14543209080_9ee6952be0_o.jpg",
  "date": "July 25, 2014",
  "category": "code",
  "excerpt": "With CSS columns you can create a print-inspired layout with little added markup that can adapt beyond a fixed canvas...."
},{
  "title": "Elizabethtown",
  "link": "/adventures/elizabethtown/",
  "image": "https://farm4.staticflickr.com/3907/14514367399_b410ce770a_b.jpg",
  "date": "July 20, 2014",
  "category": "adventures",
  "excerpt": "This weekend we stayed with friends in Lewis. On Saturday we woke up early to catch the town-wide garage sales..."
},{
  "title": "Favorite Haml snippets",
  "link": "/code/haml-snippets/",
  "image": "https://farm6.staticflickr.com/5588/14429683600_f7f828069a_o.png",
  "date": "July 9, 2014",
  "category": "code",
  "excerpt": "I love writing my pens in Haml, but I still have a hard time remembering the syntax. I created a..."
},{
  "title": "2014 Spring",
  "link": "/playlists/2014/spring/",
  "image": "http://katydecorah.com/img/playlists/2014-spring.png",
  "date": "June 21, 2014",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Mini Boston Cream Pies",
  "link": "/epicurean/mini-boston-cream-pie/",
  "image": "https://farm6.staticflickr.com/5593/14475647445_b6a140e9e7_b.jpg",
  "date": "June 16, 2014",
  "category": "epicurean",
  "excerpt": "For Father’s Day, I made our dads their very own 3″ Boston Creme Pie. Just a couple weeks ago, I..."
},{
  "title": "Asheville",
  "link": "/adventures/asheville/",
  "image": "https://farm6.staticflickr.com/5235/14379383021_566f82cd22_b.jpg",
  "date": "June 15, 2014",
  "category": "adventures",
  "excerpt": "I spent the past week visiting my sister in Asheville. That place never gets old. Saturday night we saw the..."
},{
  "title": "Happy Birthday Blog",
  "link": "/notes/happy-birthday/",
  "image": "https://farm6.staticflickr.com/5477/14174930269_b388e7da02_b.jpg",
  "date": "June 6, 2014",
  "category": "notes",
  "excerpt": "A year ago I decided to settle down and find myself a blogging system. I had heard about Jekyll and..."
},{
  "title": "Border spinners",
  "link": "/code/border-spinners/",
  "image": "http://i.imgur.com/axSxlAN.gif",
  "date": "June 5, 2014",
  "category": "code",
  "excerpt": "See the Pen Twinner Spinner by Katy DeCorah (@katydecorah) on CodePen. A few days ago, I wanted to create a..."
},{
  "title": "Jekyll and AngularJS",
  "link": "/code/jekyll-and-angular/",
  "image": "https://farm6.staticflickr.com/5157/14278201486_25b78eef45_o.png",
  "date": "May 29, 2014",
  "category": "code",
  "excerpt": "I’m a total AngularJS rube, so it took me a few tries to get Angular to work on a Jekyll..."
},{
  "title": "Huyck Preserve",
  "link": "/adventures/huyck-preserve/",
  "image": "https://farm4.staticflickr.com/3820/14082114487_15152934af_b.jpg",
  "date": "May 25, 2014",
  "category": "adventures",
  "excerpt": "We took a ride out to Rensselaerville and explored the Huyck Preserve again. We took the trail around Lake Myosotis...."
},{
  "title": "Papscanee Island Nature Preserve",
  "link": "/adventures/papscanee-island-nature-preserve/",
  "image": "https://farm3.staticflickr.com/2897/14226916873_111fb655b5_z.jpg",
  "date": "May 17, 2014",
  "category": "adventures",
  "excerpt": "This morning we went to the Papscanee Island Nature Preserve in Rensselaer. We started at the north entrance of the..."
},{
  "title": "Raspberry Chocolate Brownies",
  "link": "/epicurean/raspberry-brownies/",
  "image": "https://farm3.staticflickr.com/2939/14289010659_37f7efa467_b.jpg",
  "date": "May 11, 2014",
  "category": "epicurean",
  "excerpt": "\n\n\n\nFor Mother’s day, I made our moms these rich brownies.\n"
},{
  "title": "Ja! by Andreas Samuelsson",
  "link": "/code/ja/",
  "image": "https://farm6.staticflickr.com/5200/14094690426_46aa87013f_o.png",
  "date": "May 5, 2014",
  "category": "code",
  "excerpt": "See the Pen Ja! by Andreas Samuelsson by Katy DeCorah (@katydecorah) on CodePen. Ja! by Andreas Samuelsson I stumbled upon..."
},{
  "title": "word-break or word-wrap?",
  "link": "/code/word-break-word-wrap/",
  "image": "https://farm8.staticflickr.com/7170/13455308735_d336443366_o.png",
  "date": "March 27, 2014",
  "category": "code",
  "excerpt": "See the Pen word-break or word-wrap? by Katy DeCorah (@katydecorah) on CodePen. Given overflowing text, I always needed to stop..."
},{
  "title": "Jekyll data playlists",
  "link": "/code/jekyll-data-playlists/",
  "image": "https://farm3.staticflickr.com/2868/13362876355_b3ce6c825f_o.png",
  "date": "March 23, 2014",
  "category": "code",
  "excerpt": "In 2008, I started creating a playlist for every season. I kept my playlists in iTunes, but have migrated to..."
},{
  "title": "2013/2014 Winter",
  "link": "/playlists/2014/winter/",
  "image": "http://katydecorah.com/img/playlists/2013-2014-winter.png",
  "date": "March 20, 2014",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Dots",
  "link": "/code/dots/",
  "image": "http://farm4.staticflickr.com/3715/13277412163_2a1f8eb8d7_o.gif",
  "date": "March 19, 2014",
  "category": "code",
  "excerpt": "See the Pen Dots by Katy DeCorah (@katydecorah) on CodePen. The other day I came across the Dribbble shot Cross..."
},{
  "title": "The East Wing Episode 86",
  "link": "/code/the-east-wing/",
  "image": "https://farm6.staticflickr.com/5272/14060621609_2ffa436f77_o.jpg",
  "date": "March 14, 2014",
  "category": "code",
  "excerpt": "I had a nice time chatting with Chris Enns on the East Wing! Chris Enns fills in again for Tim..."
},{
  "title": "Leadership Letters by Jeroen van Eerden",
  "link": "/code/leadership-letters/",
  "image": "http://farm8.staticflickr.com/7083/13157662535_270504e7a3_o.png",
  "date": "March 14, 2014",
  "category": "code",
  "excerpt": "See the Pen Leadership Letters #2. by Jeroen van Eerden by Katy DeCorah (@katydecorah) on CodePen. Leadership Letters #2. by..."
},{
  "title": "Slidey background",
  "link": "/code/slidey-background/",
  "image": "http://farm4.staticflickr.com/3326/13012960323_1ca9571922.jpg",
  "date": "March 7, 2014",
  "category": "code",
  "excerpt": "See the Pen Slidey Background by Katy DeCorah (@katydecorah) on CodePen. Each box above is an anchor tag with a..."
},{
  "title": "Homemade Ice Cream",
  "link": "/epicurean/ice-cream/",
  "image": "https://c2.staticflickr.com/8/7344/12938937013_7741034daa_b.jpg",
  "date": "March 4, 2014",
  "category": "epicurean",
  "excerpt": "Homemade Coffee Ice Cream I am a novice ice cream maker. My qualifications include: loving the taste of ice cream...."
},{
  "title": "Washington DC",
  "link": "/adventures/washington-dc/",
  "image": "https://s3.yimg.com/so/7405/12667170644_fcf57be895_b.jpg",
  "date": "February 24, 2014",
  "category": "adventures",
  "excerpt": "I spent an awesome week in DC.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
},{
  "title": "calc(you + me)",
  "link": "/code/calc-you-and-me/",
  "image": "http://farm4.staticflickr.com/3772/12730355005_2434189c5b_o.png",
  "date": "February 14, 2014",
  "category": "code",
  "excerpt": "See the Pen calc(you + me) by Katy DeCorah (@katydecorah) on CodePen. Every Valentine’s Day, I like to make my..."
},{
  "title": "THREES App Store Button",
  "link": "/code/threes-app-store-button/",
  "image": "http://farm4.staticflickr.com/3696/12857308175_d80c0ac743_o.png",
  "date": "February 11, 2014",
  "category": "code",
  "excerpt": "See the Pen THREES App Store Button by Katy DeCorah (@katydecorah) on CodePen. I recently came across the website for..."
},{
  "title": "Wells Weekend",
  "link": "/adventures/wells-weekend/",
  "image": "http://farm4.staticflickr.com/3683/12272509994_ee4ccc1a24_b.jpg",
  "date": "February 2, 2014",
  "category": "adventures",
  "excerpt": "This weekend we celebrated my birthday in a cabin in Wells, NY. I read a book, we watched movies, we..."
},{
  "title": "Power Up Preloader by Mantas Ba&#269;iu&#353;ka",
  "link": "/code/power-up-preloader/",
  "image": "https://farm3.staticflickr.com/2860/12730278733_e045273427_o.png",
  "date": "January 30, 2014",
  "category": "code",
  "excerpt": "See the Pen Power Up Preloader (GIF) by Mantas Bačiuška by Katy DeCorah (@katydecorah) on CodePen. I created another scalable,..."
},{
  "title": "Mapbox for Jekyll posts",
  "link": "/code/mapbox-for-jekyll-posts/",
  "image": "http://a.tiles.mapbox.com/v3/katydecorah.h41bj3lj/5/9/11.png",
  "date": "January 26, 2014",
  "category": "code",
  "excerpt": "As of 7/26/2014, this site has moved to the Mapbox static API. A few months ago, I began playing around..."
},{
  "title": "I cut my hair",
  "link": "/notes/hair-today/",
  "image": "https://instagram.com/p/jiOsiVCI_O/media/?size=l",
  "date": "January 25, 2014",
  "category": "notes",
  "excerpt": "\n\n\n\n\nI’m sending about 11 inches to Pantene Beautiful Lengths!\n"
},{
  "title": "Escape by Carla Corrales",
  "link": "/code/escape-by-carla-corrales/",
  "image": "http://farm3.staticflickr.com/2881/12730618224_35decb3433.jpg",
  "date": "January 15, 2014",
  "category": "code",
  "excerpt": "See the Pen Escape by Carla Corrales by Katy DeCorah (@katydecorah) on CodePen. I have another single element project! I..."
},{
  "title": "Dean Farm Heritage Trail",
  "link": "/adventures/dean-farm-heritage-trail/",
  "image": "http://farm4.staticflickr.com/3762/11916446806_0ff8626e19_b.jpg",
  "date": "January 12, 2014",
  "category": "adventures",
  "excerpt": "Today my folks and I explored the Dean Farm Heritage Trail in Stony Creek. The trail was fairly easy to..."
},{
  "title": "The Cheers Sweatshirt",
  "link": "/notes/the-cheers-sweatshirt/",
  "image": "http://farm4.staticflickr.com/3690/11890656616_c2f1b49dba_b.jpg",
  "date": "January 11, 2014",
  "category": "notes",
  "excerpt": "I received so many wonderful gifts this past Christmas, but one stands out. Early last year I started watching Cheers..."
},{
  "title": "Flat icon by _Bosco",
  "link": "/code/flat-icon-by-bosco/",
  "image": "http://farm4.staticflickr.com/3708/12730299513_58bce11c10_o.png",
  "date": "January 3, 2014",
  "category": "code",
  "excerpt": "See the Pen Flat icon by _Bosco by Katy DeCorah (@katydecorah) on CodePen I recreated the Dribbble shot Flat icon..."
},{
  "title": "Baking in the New Year",
  "link": "/epicurean/baking-in-the-new-year/",
  "image": "http://farm6.staticflickr.com/5542/11698901103_36b11493b2_b.jpg",
  "date": "January 1, 2014",
  "category": "epicurean",
  "excerpt": "\n\n \n\n\nIt took several hours, but my oh my… worth it.\n\nCinnamon swirl buns recipe by Smitten Kitchen\n"
},{
  "title": "z-index and transform",
  "link": "/code/z-index-and-transform/",
  "image": "http://farm8.staticflickr.com/7409/12730119235_c26ceaf678_o.png",
  "date": "January 1, 2014",
  "category": "code",
  "excerpt": "See the Pen END by Catt by Katy DeCorah (@katydecorah) on CodePen I knew that I wanted to code out..."
},{
  "title": "Food by nos",
  "link": "/code/food-by-nos/",
  "image": "http://farm4.staticflickr.com/3685/12730139965_505cccb115_o.png",
  "date": "December 23, 2013",
  "category": "code",
  "excerpt": "See the Pen Food by nos by Katy DeCorah (@katydecorah) on CodePen Above is the Dribbble shot, Food by nos,..."
},{
  "title": "2013 Fall",
  "link": "/playlists/2013/fall/",
  "image": "http://katydecorah.com/img/playlists/2013-fall.png",
  "date": "December 21, 2013",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Holiday tree(s)",
  "link": "/code/holiday-trees/",
  "image": "http://codepen.io/katydecorah/pen/xcDHf/image/large.png",
  "date": "December 19, 2013",
  "category": "code",
  "excerpt": "See the Pen Holiday tree(s) by Katy DeCorah (@katydecorah) on CodePen I whipped up a little animation in honor of..."
},{
  "title": "Holiday Treats",
  "link": "/epicurean/holiday-treats/",
  "image": "http://farm8.staticflickr.com/7353/11428854303_f8bb3b982f_b.jpg",
  "date": "December 17, 2013",
  "category": "epicurean",
  "excerpt": "I’ve been baking.\n\n\n\n\n\nRum balls.\n\n\n \n\n\nChocolate dipped pretzel rods. Double chunk peppermint cookies.\n\nThere will be more. Pinky promise.\n"
},{
  "title": "Animation direction",
  "link": "/code/animation-direction/",
  "image": "http://codepen.io/katydecorah/pen/qKnGs/image/large.png",
  "date": "December 9, 2013",
  "category": "code",
  "excerpt": "See the Pen Animation Direction by Katy DeCorah (@katydecorah) on CodePen I never fully understood the values of animation-direction, the..."
},{
  "title": "Heroes Queue by Antonas Deduchovas",
  "link": "/code/heroes-queue/",
  "image": "http://codepen.io/katydecorah/pen/cJfhC/image/large.png",
  "date": "December 6, 2013",
  "category": "code",
  "excerpt": "See the Pen Heroes Queue by Antonas Deduchovas by Katy DeCorah (@katydecorah) on CodePen I love trying to find different..."
},{
  "title": "Simple box",
  "link": "/code/simple-box/",
  "image": "http://codepen.io/katydecorah/pen/vrzmH/image/large.png",
  "date": "December 4, 2013",
  "category": "code",
  "excerpt": "See the Pen Simple Box by Katy DeCorah (@katydecorah) on CodePen The .box is a single element. I used the..."
},{
  "title": "Albany Pine Bush &amp; Family Sunday",
  "link": "/adventures/albany-pine-bush/",
  "image": "http://farm4.staticflickr.com/3732/11014694753_2138457b1c_b.jpg",
  "date": "November 24, 2013",
  "category": "adventures",
  "excerpt": "Saturday morning we visited the Albany Pine Bush at Karner Barrens East &amp; West. We took the blue trail to..."
},{
  "title": "Rabbit by Beard Chicken",
  "link": "/code/rabbit-by-beard-chicken/",
  "image": "http://i.cdpn.io.s3.amazonaws.com/6362.uIEFy.bc2d5743-393d-4569-9887-20a32aed7fd0.png",
  "date": "November 20, 2013",
  "category": "code",
  "excerpt": "See the Pen Rabbit by Beard Chicken by Katy DeCorah (@katydecorah) on CodePen This fun little animation was built from..."
},{
  "title": "Pretzels &amp; Williamsburg",
  "link": "/adventures/pretzels-and-williamsburg/",
  "image": "http://farm8.staticflickr.com/7298/10953719465_eb873a018c_b.jpg",
  "date": "November 18, 2013",
  "category": "adventures",
  "excerpt": "Saturday night I had an all out snack attack. Right before heading to the store to pick-up rice krispies treat..."
},{
  "title": "Tea, Wine, &amp; Mud Pond",
  "link": "/adventures/tea-wine-and-mud-pond/",
  "image": "http://farm6.staticflickr.com/5547/10789496434_0f2b245c5c_c.jpg",
  "date": "November 11, 2013",
  "category": "adventures",
  "excerpt": "Tea On Sunday, mom and I went to lunch at the Whistling Tea Kettle in Ballston Spa. She had the..."
},{
  "title": "Scalable balloons",
  "link": "/code/scalable-balloons/",
  "image": "http://codepen.io/katydecorah/pen/cdkHn/image/large.png",
  "date": "November 5, 2013",
  "category": "code",
  "excerpt": "See the Pen Random Customizable Balloons by Katy DeCorah (@katydecorah) on CodePen I saw this Dribbble shot and decided to..."
},{
  "title": "Albany Rural Cemetery",
  "link": "/adventures/albany-rural-cemetery/",
  "image": "http://farm6.staticflickr.com/5494/10655548255_732b4fb554_c.jpg",
  "date": "November 3, 2013",
  "category": "adventures",
  "excerpt": "On Sunday, mom drove down for part of the day. We grabbed lunch at the Pump Station and then explored..."
},{
  "title": "Ice Cream Pattern by Dorottya Porkolab",
  "link": "/code/ice-cream-pattern/",
  "image": "http://codepen.io/katydecorah/pen/Bjoui/image/large.png",
  "date": "November 1, 2013",
  "category": "code",
  "excerpt": "See the Pen Ice Cream Pattern by Dorottya Porkolab by Katy DeCorah (@katydecorah) on CodePen Dribbble shot Ice Cream Pattern..."
},{
  "title": "Git file renaming",
  "link": "/code/git-file-renaming/",
  "image": "http://farm8.staticflickr.com/7455/12730119245_3d8d6ec41a_o.jpg",
  "date": "October 29, 2013",
  "category": "code",
  "excerpt": "Today at work I needed to move and rename a ton of files, but I also needed to make sure..."
},{
  "title": "Hallowiener by Bobby McKenna",
  "link": "/code/hallowiener/",
  "image": "http://codepen.io/katydecorah/pen/qpoFv/image/large.png",
  "date": "October 27, 2013",
  "category": "code",
  "excerpt": "See the Pen Hallowiener by Bobby McKenna by Katy DeCorah (@katydecorah) on CodePen Another Dribbble shot turned code. Hover for..."
},{
  "title": "Greenwich &amp; treasure hunting",
  "link": "/adventures/greenwich-and-treasure-hunting/",
  "image": "http://farm4.staticflickr.com/3710/10390926954_1d0b25911d_c.jpg",
  "date": "October 20, 2013",
  "category": "adventures",
  "excerpt": "On Saturday, I woke up early and drove down to Greenwich, CT. A very good friend of mine moved down..."
},{
  "title": "Mount Baker &amp; Aunt Pauline’s .22",
  "link": "/adventures/mount-baker/",
  "image": "http://farm3.staticflickr.com/2823/10229168105_2131a10c49_c.jpg",
  "date": "October 14, 2013",
  "category": "adventures",
  "excerpt": "Mount Baker This weekend I visited my friend Becky in Lake Placid. We woke up early on Saturday to hike..."
},{
  "title": "Navigation Bar by Jan Kaděra",
  "link": "/code/navigation-bar/",
  "image": "http://farm4.staticflickr.com/3778/12730510863_605ccbbc36_o.png",
  "date": "October 10, 2013",
  "category": "code",
  "excerpt": "See the Pen Navigation Bar by Jan Kaděra by Katy DeCorah (@katydecorah) on CodePen Another Dribbble shot for the books...."
},{
  "title": "Apple Pickin &amp; Apple Pie Makin",
  "link": "/adventures/apple-picking/",
  "image": "http://farm6.staticflickr.com/5340/10102694436_83377f3c85_c.jpg",
  "date": "October 6, 2013",
  "category": "adventures",
  "excerpt": "Saturday We woke up early and drove to Golden Harvest Farms in Valatie. We chose this spot apparently they have..."
},{
  "title": "BoldMedia Logo Variation by Jeroen van Eerden",
  "link": "/code/boldmedia-logo-variation/",
  "image": "http://codepen.io/katydecorah/pen/hjxHy/image/large.png",
  "date": "September 30, 2013",
  "category": "code",
  "excerpt": "See the Pen BoldMedia Logo Variation by Jeroen van Eerden by Katy DeCorah (@katydecorah) on CodePen A Dribbble shot that..."
},{
  "title": "Incrementally awesome Sass labels",
  "link": "/code/incrementally-awesome-sass-labels/",
  "image": "http://farm8.staticflickr.com/7340/12730825944_d47ef70a77_o.png",
  "date": "September 29, 2013",
  "category": "code",
  "excerpt": "For this site I wanted my categories to be color coded, but I didn’t want to put a lot of..."
},{
  "title": "Mount Greylock",
  "link": "/adventures/mount-greylock/",
  "image": "http://farm3.staticflickr.com/2876/9986357986_cba890f804_c.jpg",
  "date": "September 28, 2013",
  "category": "adventures",
  "excerpt": "We woke up early and drove out to Mount Greylock in Mass. It was a gorgeous morning! Then these dudes..."
},{
  "title": "Google Static Map Maker",
  "link": "/code/google-static-map-maker/",
  "image": "http://codepen.io/katydecorah/pen/Klieu/image/large.png",
  "date": "September 23, 2013",
  "category": "code",
  "excerpt": "The Google Static Map Marker is also served on its own page. See the Pen Google Static Map Maker by..."
},{
  "title": "2013 Summer",
  "link": "/playlists/2013/summer/",
  "image": "http://katydecorah.com/img/playlists/2013-summer.png",
  "date": "September 21, 2013",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Adirondack Balloon Festival &amp; Coldbrook Preserve",
  "link": "/adventures/adirondack-balloon-festival/",
  "image": "http://farm3.staticflickr.com/2893/9874639174_9a41feb163_b.jpg",
  "date": "September 21, 2013",
  "category": "adventures",
  "excerpt": "Balloon Festival Friday night I drove to my folks house. The next morning, Mom and I woke up at 4..."
},{
  "title": "Bowl of trees",
  "link": "/code/bowl-of-trees/",
  "image": "http://codepen.io/katydecorah/pen/oEiCf/image/large.png",
  "date": "September 18, 2013",
  "category": "code",
  "excerpt": "See the Pen Bowl of Trees by Katy DeCorah (@katydecorah) on CodePen I could not have made this without Haml..."
},{
  "title": "Accordion nav",
  "link": "/code/accordion-nav/",
  "image": "http://codepen.io/katydecorah/pen/kEuwC/image/large.png",
  "date": "September 17, 2013",
  "category": "code",
  "excerpt": "See the Pen Accordion Nav by Katy DeCorah (@katydecorah) on CodePen This is very typical list-style navigation, in that the..."
},{
  "title": "Decorating a wedding",
  "link": "/adventures/decorating-a-wedding/",
  "image": "http://farm4.staticflickr.com/3827/9808951525_5671dff954_c.jpg",
  "date": "September 14, 2013",
  "category": "adventures",
  "excerpt": "This weekend I had the privilege of decorating a friend’s wedding at the Wilburton Inn in Manchester, Vermont. As payment,..."
},{
  "title": "VSCO Cam logo",
  "link": "/code/vsco-cam-logo/",
  "image": "http://codepen.io/katydecorah/pen/dLgqG/image/large.png",
  "date": "September 13, 2013",
  "category": "code",
  "excerpt": "See the Pen VSCO CAM logo by Katy DeCorah (@katydecorah) on CodePen I use VSCO Cam regularly for iPhone photo..."
},{
  "title": "Simple split color",
  "link": "/code/simple-split-color/",
  "image": "http://codepen.io/katydecorah/pen/ElaeD/image/large.png",
  "date": "September 13, 2013",
  "category": "code",
  "excerpt": "See the Pen Simple Split Color Element by Katy DeCorah (@katydecorah) on CodePen The effect is achieved on a single..."
},{
  "title": "Static Google maps for Jekyll",
  "link": "/code/google-maps-images-api-for-jekyll/",
  "image": "http://farm6.staticflickr.com/5502/12730513003_185231255d_o.png",
  "date": "September 6, 2013",
  "category": "code",
  "excerpt": "As of 7/26/2014, this site has moved to the Mapbox static API. I have several posts with locations and I..."
},{
  "title": "Haml clock",
  "link": "/code/haml-clock/",
  "image": "http://farm3.staticflickr.com/2813/12730353565_9761bd9128_o.png",
  "date": "September 5, 2013",
  "category": "code",
  "excerpt": "See the Pen Haml Clock by Katy DeCorah (@katydecorah) on CodePen After creating the Haml calendar, I decided to go..."
},{
  "title": "Thacher Park in the morning",
  "link": "/adventures/thacher-park-in-the-morning/",
  "image": "http://farm3.staticflickr.com/2820/9696150324_6c007a3a42_c.jpg",
  "date": "September 5, 2013",
  "category": "adventures",
  "excerpt": "Beautiful morning. (Confession: before today I was spelling Thacher with two ts.) Post-hike treat Later that day we tried to..."
},{
  "title": "Simple icons",
  "link": "/code/simple-icons/",
  "image": "http://codepen.io/katydecorah/pen/KhfCn/image/small.png",
  "date": "September 4, 2013",
  "category": "code",
  "excerpt": "Original design by Rovane Durso.\n\nSee the Pen Dribbble//Simple Icons by Katy DeCorah (@katydecorah) on CodePen\n"
},{
  "title": "The Black Bean Brownie",
  "link": "/epicurean/black-bean-brownies/",
  "image": "http://farm4.staticflickr.com/3725/9665840645_26b937ed79_c.jpg",
  "date": "September 3, 2013",
  "category": "epicurean",
  "excerpt": "Surprisingly amazing! The brownies didn’t taste or have the texture of black beans. The recipe requires you to whip everything..."
},{
  "title": "Mini dark settings window",
  "link": "/code/mini-dark-settings-window/",
  "image": "http://codepen.io/katydecorah/pen/LpsGB/image/small.png",
  "date": "September 3, 2013",
  "category": "code",
  "excerpt": "Original design by Ben Bate.\n\nSee the Pen Dribbble//Mini Dark Settings Window by Katy DeCorah (@katydecorah) on CodePen\n"
},{
  "title": "Washington County",
  "link": "/adventures/washington-county/",
  "image": "http://farm3.staticflickr.com/2883/9640995748_1ef8807155_c.jpg",
  "date": "August 31, 2013",
  "category": "adventures",
  "excerpt": "Mom and I went on a Washington County/Vermont adventure today. Argyle, NY Cossayuna Lake Hebron, NY Rexleigh Bridge in Shushan,..."
},{
  "title": "Bird in a tablet",
  "link": "/code/bird-in-a-tablet/",
  "image": "http://codepen.io/katydecorah/pen/DHCJg/image/small.png",
  "date": "August 28, 2013",
  "category": "code",
  "excerpt": "As a kid, I remember drawing a picture of a bird on one side of paper and a cage on..."
},{
  "title": "Random() bubbly",
  "link": "/code/random-bubbly/",
  "image": "http://codepen.io/katydecorah/pen/xbtch/image/small.png",
  "date": "August 27, 2013",
  "category": "code",
  "excerpt": "Giving the Sass random() a go.\n\nSee the Pen Random Bubbly by Katy DeCorah (@katydecorah) on CodePen\n"
},{
  "title": "AngularJS contact form",
  "link": "/code/angular-contact-form/",
  "image": "http://codepen.io/katydecorah/pen/IiDKe/image/small.png",
  "date": "August 27, 2013",
  "category": "code",
  "excerpt": "My first try Angular form validation.\n\nSee the Pen Angular Contact Form by Katy DeCorah (@katydecorah) on CodePen\n"
},{
  "title": "Haml calendar",
  "link": "/code/haml-calendar/",
  "image": "http://farm8.staticflickr.com/7446/12730512683_90cba24840_o.png",
  "date": "August 26, 2013",
  "category": "code",
  "excerpt": "See the Pen Haml Calendar by Katy DeCorah (@katydecorah) on CodePen While I was looking through the Haml docs today,..."
},{
  "title": "Palmertown Mountain Range",
  "link": "/adventures/palmertown-mountain-range/",
  "image": "http://farm8.staticflickr.com/7347/9583833497_0171fe8688_c.jpg",
  "date": "August 24, 2013",
  "category": "adventures",
  "excerpt": "We woke up early and drove up to Moreau Lake State Park for a hike. We parked on Spier Falls..."
},{
  "title": "Rensselaerville",
  "link": "/adventures/rensselaerville/",
  "image": "http://farm4.staticflickr.com/3804/9565395773_d71409faf5_c.jpg",
  "date": "August 21, 2013",
  "category": "adventures",
  "excerpt": "A nice after work drive to shoot star photos, but the moon was too bright.\n\n\n\n\n\n"
},{
  "title": "Optical illusions",
  "link": "/code/optical-illusion/",
  "image": "http://farm8.staticflickr.com/7324/12730510673_c1866394ba_o.png",
  "date": "August 19, 2013",
  "category": "code",
  "excerpt": "I gave a few optical illusions a try to flex my Sass skills. The source file for each illusion can..."
},{
  "title": "Raspberry Trifle",
  "link": "/epicurean/raspberry-trifle/",
  "image": "http://farm8.staticflickr.com/7351/9568133232_db001536e7_c.jpg",
  "date": "August 18, 2013",
  "category": "epicurean",
  "excerpt": "Incredibly easy and delicious! Once you have the ingredients together, assembly is simple. I ended up using three packages of..."
},{
  "title": "Coconut Thumbprint Cookies with Salted Caramel",
  "link": "/epicurean/coconut-thumbprint-cookies/",
  "image": "http://farm6.staticflickr.com/5336/9510513917_12c4bc3152_z.jpg",
  "date": "August 14, 2013",
  "category": "epicurean",
  "excerpt": "I found this recipe on a late night Pinterest binge. I’m convinced people only post delicious treats at night time..."
},{
  "title": "Windowsill Cherry Tomatoes",
  "link": "/notes/cherry-tomatoes/",
  "image": "http://farm4.staticflickr.com/3777/9496159841_8160d1b55b_z.jpg",
  "date": "August 12, 2013",
  "category": "notes",
  "excerpt": "This past winter I decided that I wanted to grow food. More specifically, I wanted to wake up in my..."
},{
  "title": "Simple border-width loader",
  "link": "/code/simple-border-loader/",
  "image": "http://codepen.io/katydecorah/pen/hdsLI/image/small.png",
  "date": "August 10, 2013",
  "category": "code",
  "excerpt": "See the Pen Simple border-width loader by Katy DeCorah (@katydecorah) on CodePen\n"
},{
  "title": "Forebruary",
  "link": "/code/forebruary/",
  "image": "http://farm6.staticflickr.com/5492/12730828934_f9915c2509_o.png",
  "date": "August 7, 2013",
  "category": "code",
  "excerpt": "See the Pen Forebruary by Katy DeCorah (@katydecorah) on CodePen A few days ago I saw Forebruary by Ilya Birman;..."
},{
  "title": "Triangles",
  "link": "/code/triangles/",
  "image": "http://farm3.staticflickr.com/2878/12730825804_16446faf71_o.png",
  "date": "August 6, 2013",
  "category": "code",
  "excerpt": "See the Pen Triangles by Katy DeCorah (@katydecorah) on CodePen I’ve been into simple shapes lately. I found this interesting..."
},{
  "title": "Font Awesome Buttons",
  "link": "/code/font-awesome-buttons/",
  "image": "http://farm4.staticflickr.com/3731/12730354485_3d3356068b_o.png",
  "date": "August 5, 2013",
  "category": "code",
  "excerpt": "See the Pen Font Awesome Buttons by Katy DeCorah (@katydecorah) on CodePen Another Dribbble inspired project! I’ve been using Font..."
},{
  "title": "Lake Placid &amp; Potter's Point",
  "link": "/adventures/lake-placid-potters-point/",
  "image": "http://farm4.staticflickr.com/3687/9440884304_609a0f98e9_c.jpg",
  "date": "August 4, 2013",
  "category": "adventures",
  "excerpt": "This weekend I visited my college roommate in Lake Placid. We walked around Mirror Lake once a day, ate delicious..."
},{
  "title": "CSS octagon",
  "link": "/code/octagon/",
  "image": "http://farm4.staticflickr.com/3690/12730351925_f0ea7f82f8_o.png",
  "date": "August 1, 2013",
  "category": "code",
  "excerpt": "See the Pen Octagon by Katy DeCorah (@katydecorah) on CodePen After creating the CSS Diamond I tried to replicate this..."
},{
  "title": "CSS diamond",
  "link": "/code/diamond/",
  "image": "http://farm3.staticflickr.com/2832/12730354835_a58a0cd83c_o.png",
  "date": "August 1, 2013",
  "category": "code",
  "excerpt": "See the Pen Diamond by Katy DeCorah (@katydecorah) on CodePen I decided to try to create a CodePen from a..."
},{
  "title": "CSS bicycle wheel",
  "link": "/code/bicycle-wheel/",
  "image": "http://farm8.staticflickr.com/7304/12730514073_72e52afa5d_o.png",
  "date": "August 1, 2013",
  "category": "code",
  "excerpt": "See the Pen Bicycle Wheel by Katy DeCorah (@katydecorah) on CodePen After I showed my boyfriend the CSS Octagon, he..."
},{
  "title": "Baklava",
  "link": "/epicurean/baklava/",
  "image": "http://farm3.staticflickr.com/2805/9410807839_c02e05a618_c.jpg",
  "date": "July 27, 2013",
  "category": "epicurean",
  "excerpt": "Maybe it was the stacks of delicate layers interrupted by expertly chopped walnuts that made me think that making homemade..."
},{
  "title": "Simple chart",
  "link": "/code/simple-chart/",
  "image": "http://codepen.io/katydecorah/pen/hungF/image/small.png",
  "date": "July 25, 2013",
  "category": "code",
  "excerpt": "See the Pen Simple chart by Katy DeCorah (@katydecorah) on CodePen\n"
},{
  "title": "Homemade Vanilla Marshmallows",
  "link": "/epicurean/homemade-vanilla-marshmallows/",
  "image": "http://farm4.staticflickr.com/3761/9363184178_cac8e71d0a_c.jpg",
  "date": "July 20, 2013",
  "category": "epicurean",
  "excerpt": "I love marshmallows. I officially love homemade marshmallows even more. The recipe I found was simple to follow. I recommend..."
},{
  "title": "Three Mini Vacations",
  "link": "/adventures/three-mini-vacations/",
  "image": "http://farm6.staticflickr.com/5471/9360368377_d47822c551_c.jpg",
  "date": "July 8, 2013",
  "category": "adventures",
  "excerpt": "Lake Placid On Monday, I drove up to Lake Placid to visit my college roommate. We went out to dinner,..."
},{
  "title": "Raspberry Chocolate Pie",
  "link": "/epicurean/raspberry-chocolate-pie/",
  "image": "http://farm3.staticflickr.com/2820/9363187784_6237192a90_c.jpg",
  "date": "July 4, 2013",
  "category": "epicurean",
  "excerpt": "In honor of our nation’s birth I accidentally made a semi-French dessert. Hmm… well. It was good. I mean real..."
},{
  "title": "Google Font Explorer",
  "link": "/code/google-font-explorer/",
  "image": "http://farm8.staticflickr.com/7313/12730828734_c2dd990974_o.png",
  "date": "July 3, 2013",
  "category": "code",
  "excerpt": "See the Pen Google Font Explorer by Katy DeCorah (@katydecorah) on CodePen Update 9/12/2013 I received many requests on CodePen..."
},{
  "title": "The Snow Hole",
  "link": "/adventures/the-snow-hole/",
  "image": "http://farm4.staticflickr.com/3809/9110227939_78d3fcd71f_n.jpg",
  "date": "June 22, 2013",
  "category": "adventures",
  "excerpt": "Awesome 2.7 mile hike to the Snow Hole in the Taconic Mountains. No snow in the hole, but we had..."
},{
  "title": "2013 Spring",
  "link": "/playlists/2013/spring/",
  "image": "http://katydecorah.com/img/playlists/2013-spring.png",
  "date": "June 21, 2013",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Western Mass Adventures",
  "link": "/adventures/western-mass-adventures/",
  "image": "http://farm6.staticflickr.com/5336/8916078180_7f0dbe0411.jpg",
  "date": "June 2, 2013",
  "category": "adventures",
  "excerpt": "This weekend we woke up early and drove out to North Adams, Massachusetts. We took a 20-minute muddy hike through..."
},{
  "title": "Line length-icator",
  "link": "/code/line-lengthicator/",
  "image": "http://farm4.staticflickr.com/3830/12730512263_517fe233f6_o.png",
  "date": "May 28, 2013",
  "category": "code",
  "excerpt": "See the Pen Line Length-icator by Katy DeCorah (@katydecorah) on CodePen I’m always trying to find the optimal line length..."
},{
  "title": "New Bike",
  "link": "/notes/new-bike/",
  "image": "http://farm8.staticflickr.com/7455/10848320634_d6e883d46e_b.jpg",
  "date": "May 21, 2013",
  "category": "notes",
  "excerpt": "I had a nice surprise from a certain someone today.\n\n\n\n\n"
},{
  "title": "Two Weddings",
  "link": "/adventures/two-weddings/",
  "image": "http://farm3.staticflickr.com/2820/10848469853_f698588d08_b.jpg",
  "date": "May 19, 2013",
  "category": "adventures",
  "excerpt": "I had the distinct honor of being in two weddings this month. For both weddings, I designed t-shirts for the..."
},{
  "title": "Hug O' War",
  "link": "/code/hug-o-war/",
  "image": "http://farm4.staticflickr.com/3679/12730353245_0d59b5c966_o.png",
  "date": "May 16, 2013",
  "category": "code",
  "excerpt": "See the Pen Rodeo 5 by Katy DeCorah (@katydecorah) on CodePen I came in second place during week one season..."
},{
  "title": "Rensselaerville &amp; Granville",
  "link": "/adventures/rensselaerville-granville/",
  "image": "http://farm8.staticflickr.com/7300/10848303914_d20201cda4_b.jpg",
  "date": "May 4, 2013",
  "category": "adventures",
  "excerpt": "Rensselaerville\n\n\n\n\n\n\n\nGranville\n\n\n\n\n\n"
},{
  "title": "Combination lock",
  "link": "/code/combination-lock/",
  "image": "http://farm3.staticflickr.com/2838/12730513903_cd54d30d25_o.png",
  "date": "April 19, 2013",
  "category": "code",
  "excerpt": "See the Pen Combination Lock by Katy DeCorah (@katydecorah) on CodePen I created a functioning combination lock. I provided the..."
},{
  "title": "North Carolina",
  "link": "/adventures/north-carolina/",
  "image": "http://farm8.staticflickr.com/7366/9702678259_877fa5dab4_c.jpg",
  "date": "April 7, 2013",
  "category": "adventures",
  "excerpt": "My sister moved to North Carolina a few years ago. Since then my folks and I make an annual trip..."
},{
  "title": "Cookie Monster Cupcakes",
  "link": "/epicurean/cookie-monster-cupcakes/",
  "image": "http://farm8.staticflickr.com/7401/9705857322_b7723a269e_c.jpg",
  "date": "March 24, 2013",
  "category": "epicurean",
  "excerpt": "I made these cupcakes for a certain amazing person’s birthday!\n\n\n\n\n\n\n\nCookie monster cupcake recipe\n"
},{
  "title": "2012/2013 Winter",
  "link": "/playlists/2013/winter/",
  "image": "http://katydecorah.com/img/playlists/2012-2013-winter.png",
  "date": "March 19, 2013",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Rennselaerville &amp; Thacher Park",
  "link": "/adventures/rensselaerville-and-thacher-park/",
  "image": "http://farm6.staticflickr.com/5532/10848474463_b6aa3d54d6_b.jpg",
  "date": "March 16, 2013",
  "category": "adventures",
  "excerpt": "We drove out for the day for some exploring. I scored this neat shot of Albany through a coin-operated binocular...."
},{
  "title": "Lake Placid",
  "link": "/adventures/lake-placid/",
  "image": "http://farm4.staticflickr.com/3673/10848191516_7844876141_b.jpg",
  "date": "February 15, 2013",
  "category": "adventures",
  "excerpt": "Traveled up to Lake Placid for the weekend with a college roommate, to visit our other college roommate. She had..."
},{
  "title": "Spring 2013, IINF 362",
  "link": "/teaching/2013/spring/",
  "image": "https://farm8.staticflickr.com/7412/10848181776_976af4c3c3_b.jpg",
  "date": "January 23, 2013",
  "category": "teaching",
  "excerpt": "Today I start teaching Intermediate Web Development at the University at Albany. What they’ll learn: Responsive Web Design Accessibility WordPress..."
},{
  "title": "Candy Sushi",
  "link": "/epicurean/candy-sushi/",
  "image": "http://farm8.staticflickr.com/7341/10848177206_5f518d74ef_b.jpg",
  "date": "January 13, 2013",
  "category": "epicurean",
  "excerpt": "You too can bring candy sushi magic to your home. Below is a basic write-up of what I did, but..."
},{
  "title": "Sass adjust-hue reference",
  "link": "/code/sass-adjust-hue-reference/",
  "image": "http://farm6.staticflickr.com/5476/12730510033_3b98c3c1de_o.png",
  "date": "January 9, 2013",
  "category": "code",
  "excerpt": "See the Pen Sass adjust-hue reference by Katy DeCorah (@katydecorah) on CodePen If you have a color that you would..."
},{
  "title": "Double vision",
  "link": "/code/double-vision/",
  "image": "http://farm8.staticflickr.com/7349/12730829314_298d4ea023_o.png",
  "date": "January 8, 2013",
  "category": "code",
  "excerpt": "See the Pen Double Vision by Katy DeCorah (@katydecorah) on CodePen\n\nSingle element, lots of text-shadow.\n"
},{
  "title": "New Years Eve Homemade Sushi",
  "link": "/notes/new-years-eve/",
  "image": "http://farm8.staticflickr.com/7453/10848166266_a342068c2e_b.jpg",
  "date": "January 1, 2013",
  "category": "notes",
  "excerpt": "\n\n\n\nThis year we stayed in, rolled our own sushi, and fell asleep before midnight. It was my favorite.\n"
},{
  "title": "2012 Fall",
  "link": "/playlists/2012/fall/",
  "image": "http://katydecorah.com/img/playlists/2012-fall.png",
  "date": "December 21, 2012",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "2012 Summer",
  "link": "/playlists/2012/summer/",
  "image": "http://katydecorah.com/img/playlists/2012-summer.png",
  "date": "September 21, 2012",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Fall 2012, IIST 361",
  "link": "/teaching/2012/fall/",
  "image": "https://farm6.staticflickr.com/5157/14278201486_25b78eef45_o.png",
  "date": "August 31, 2012",
  "category": "teaching",
  "excerpt": "Today I start teaching Web Development at the University at Albany.\n\nWhat they’ll learn:\n\n\n  HTML5\n  CSS\n  Dreamweaver\n  Photoshop\n  JavaScript/jQuery\n\n"
},{
  "title": "2012 Spring",
  "link": "/playlists/2012/spring/",
  "image": "http://katydecorah.com/img/playlists/2012-spring.png",
  "date": "June 21, 2012",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "2011/2012 Winter",
  "link": "/playlists/2012/winter/",
  "image": "http://katydecorah.com/img/playlists/2011-2012-winter.png",
  "date": "March 20, 2012",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Spring 2012, IIST 361",
  "link": "/teaching/2012/spring/",
  "image": "https://farm6.staticflickr.com/5157/14278201486_25b78eef45_o.png",
  "date": "January 18, 2012",
  "category": "teaching",
  "excerpt": "Today I start teaching Web Development at the University at Albany.\n\nWhat they’ll learn:\n\n\n  HTML5\n  CSS\n  Dreamweaver\n  Photoshop\n  JavaScript/jQuery\n\n"
},{
  "title": "2011 Fall",
  "link": "/playlists/2011/fall/",
  "image": "http://katydecorah.com/img/playlists/2011-fall.png",
  "date": "December 21, 2011",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "2011 Summer",
  "link": "/playlists/2011/summer/",
  "image": "http://katydecorah.com/img/playlists/2011-summer.png",
  "date": "September 21, 2011",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Fall 2011, IIST 361",
  "link": "/teaching/2011/fall/",
  "image": "https://farm6.staticflickr.com/5157/14278201486_25b78eef45_o.png",
  "date": "August 31, 2011",
  "category": "teaching",
  "excerpt": "Today I start teaching Web Development at the University at Albany.\n\nWhat they’ll learn:\n\n\n  HTML5\n  CSS\n  Dreamweaver\n  Photoshop\n  JavaScript/jQuery\n\n"
},{
  "title": "2011 Spring",
  "link": "/playlists/2011/spring/",
  "image": "http://katydecorah.com/img/playlists/2011-spring.png",
  "date": "June 21, 2011",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "2010/2011 Winter",
  "link": "/playlists/2011/winter/",
  "image": "http://katydecorah.com/img/playlists/2010-2011-winter.png",
  "date": "March 20, 2011",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "2010 Fall",
  "link": "/playlists/2010/fall/",
  "image": "http://katydecorah.com/img/playlists/2010-fall.png",
  "date": "December 21, 2010",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "2010 Summer",
  "link": "/playlists/2010/summer/",
  "image": "http://katydecorah.com/img/playlists/2010-summer.png",
  "date": "September 21, 2010",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "2010 Spring",
  "link": "/playlists/2010/spring/",
  "image": "http://katydecorah.com/img/playlists/2010-spring.png",
  "date": "June 21, 2010",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Ireland & Spain",
  "link": "/adventures/ireland-and-spain/",
  "image": "https://farm9.staticflickr.com/8582/16345479558_6d93c4116a_b.jpg",
  "date": "June 3, 2010",
  "category": "adventures",
  "excerpt": "My friend was wrapping up her Masters in Dublin, so I visited, along with another friend for two weeks. We..."
},{
  "title": "2009/2010 Winter",
  "link": "/playlists/2010/winter/",
  "image": "http://katydecorah.com/img/playlists/2009-2010-winter.png",
  "date": "March 20, 2010",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "2009 Fall",
  "link": "/playlists/2009/fall/",
  "image": "http://katydecorah.com/img/playlists/2009-fall.png",
  "date": "December 21, 2009",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "2009 Summer",
  "link": "/playlists/2009/summer/",
  "image": "http://katydecorah.com/img/playlists/2009-summer.png",
  "date": "September 21, 2009",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "2009 Spring",
  "link": "/playlists/2009/spring/",
  "image": "http://katydecorah.com/img/playlists/2009-spring.png",
  "date": "June 21, 2009",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Turkey & Greece",
  "link": "/adventures/turkey-greece/",
  "image": "https://farm8.staticflickr.com/7326/16506855066_b944227cb9_b.jpg",
  "date": "May 20, 2009",
  "category": "adventures",
  "excerpt": "At Siena, I took a business and ancient Greece course. At the end of the semester we visited Turkey and..."
},{
  "title": "2009 Winter",
  "link": "/playlists/2009/winter/",
  "image": "http://placehold.it/600",
  "date": "March 20, 2009",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "The Risorgimento",
  "link": "/adventures/italy/",
  "image": "https://farm4.staticflickr.com/3742/10009013876_55bd6460eb_b.jpg",
  "date": "February 20, 2009",
  "category": "adventures",
  "excerpt": "At Siena, I took a course called The Risorgimento. We studied Italian unification and then visited the sites during the..."
},{
  "title": "2008 Fall",
  "link": "/playlists/2008/fall/",
  "image": "http://placehold.it/600",
  "date": "December 21, 2008",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "2008 Summer",
  "link": "/playlists/2008/summer/",
  "image": "http://katydecorah.com/img/playlists/2008-summer.png",
  "date": "September 21, 2008",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "2008 Spring",
  "link": "/playlists/2008/spring/",
  "image": "http://katydecorah.com/img/playlists/2008-spring.png",
  "date": "June 21, 2008",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Roman Britain",
  "link": "/adventures/roman-britain/",
  "image": "https://farm8.staticflickr.com/7375/10002145625_b0a6415859_b.jpg",
  "date": "May 20, 2008",
  "category": "adventures",
  "excerpt": "At Siena, I took a course called Roman Britain, where we studied the Romanization of Britain. At the end of..."
},{
  "title": "2004-2005",
  "link": "/playlists/2005/",
  "image": "http://katydecorah.com/img/playlists/2004-2005.png",
  "date": "June 20, 2005",
  "category": "playlists",
  "excerpt": "\n"
},{
  "title": "Bermuda",
  "link": "/adventures/bermuda/",
  "image": "https://farm8.staticflickr.com/7455/15920359894_3de0ebfa0e_b.jpg",
  "date": "April 20, 2005",
  "category": "adventures",
  "excerpt": "One of the perks of being a Girl Scout is the senior Bermuda trip.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
}]
// builds search
$(document).ready(function() {
  $('input#search').on('keyup', function () {
    var resultdiv = $('#results');
    // Get query
    var query = $(this).val();
    // Search for it
    var result = index.search(query);
    // Show results
    resultdiv.empty();
    // Add status
    resultdiv.prepend('<p class="">Found '+result.length+' result(s)</p>');
    // Loop through, match, and add results
    for (var item in result) {
      var ref = result[item].ref;
      var searchitem = '<div class="result"><img src="'+store[ref].image+'" alt="'+store[ref].title+'" class="result-img"><div class="result-body"><a href="'+store[ref].link+'" class="post-title">'+store[ref].title+'</a><div class="post-date small">'+store[ref].category+' &times; '+store[ref].date+'</div><p>'+store[ref].excerpt+'</p></div>';
      resultdiv.append(searchitem);
    }
  });
});
