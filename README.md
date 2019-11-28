# InstaQuote
InstaQuote is an SMS based service that allows users to get a new car insurance quote without the hassle of calling their insurance provider and waiting in a long queue.

# What Inspired This
We wanted a more convenient way to get a quote on auto-insurance in the event of a change within your driver profile (i.e. demerit point change, license class increase, new car make, etc...).

Since insurance rates are not something that change often we found it appropriate to create an SMS based service, thus saving the hassle of installing an app that would rarely be used as well as the time of calling your insurance provider to get a simple quote. As a user this service would be useful because of the convienience as well as the peace of mind that there is an overarching service which can be texted anytime for an instant quote. As an insurance company, the is useful as it can be an additional service/asset that can give them the edge over the competition and it can be easily adapted to comnform to their insurance calculation algorithms.

# How does it work?
Simply text the number via SMS with the correct parameters, the input is then parsed for the parameters and through a simple algorithm, an insurance quote will be given to the user.
On the backend, after the service parses the user's SMS input, it scraps their name, gender, license type, demerit points, and car make, then stores it within a database.


# What We Learned
We learned how to connect API's using Standard Library as well as learned JavaScript. Additionally, we learned how to use backend databases to store information and manipulate that data within the database.

# A Winner in Hack Western 6
This was created as a 1-day hackathon project for Hack Western 6. 
InstaQuote also won the category prize for: "How can an insurance company connect to customers more directly?"
https://devpost.com/software/instaquote-j04v37
