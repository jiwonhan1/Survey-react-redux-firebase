Prompt #1: Survey or Quiz of Choice
Way back in Week 3 of Introduction to Programming, we began working on our first longer projects. Remember transportation survey and quiz of choice? Well, it's time to take a trip down memory lane. Back then, we used simple jQuery to create surveys and quizzes. We couldn't store any information in databases, we used hide and show, and we created small, simple algorithms. Now, though, we have many more tools at our disposal.

Create an application that allows a user to complete a quiz or survey. Users should be able to create new quizzes or surveys while other users should have the ability to fill out those surveys. To make this prompt a bit easier, you can have a set number of questions for each quiz or survey - that way, the surveys don't need to be dynamically rendered. (For instance, the form could have fields for response1, response2, and so on.)

Try implementing the following features:

A user should be able to create, update and delete a survey. All surveys should be stored in the database.
A user should be able to fill out and submit surveys. Survey results should be submitted to the database. (A survey result can be associated to a survey by mimicking a one-to-many relationship.)
A user should be able to sign up, sign in, and sign out.
A user should have their own dashboard which lists the surveys they've created.
Bonus: A user should be able to see the combined data on a survey in their dashboard. For instance, if a survey provides a 1-5 rating, return an average rating for all surveys.
Challenging: Try using a library like D3 to visualize data from surveys. This is only recommended if you have time to spare, interest in data visualization, and are doing a week-long project.