# Robusta Technical Frontend Task

## Overview

Using this markup as a base, please fix the errors and improve the usability and polish of the sign-up form.

This is meant to be a quick exercise, so please don't feel the need to spend more than a couple of hours of actual coding. Also, we are using native CSS and JS, but feel free to use any libraries you find necessary.

> Note: Make sure to commit each feature/improvement you implement using `git`.

## Task List

You are not expected to perform all those tasks, and you are not limited to these only. You can do whatever you want that will improve the overall look and feel of the form.

- Right now the page refreshes on submit, try to make the form submit the data using JavaScript (AJAX/XHR), maybe also add a loading indicator while the form submits in the background.
- Give the form a makeover, you may take inspiration from any website you would like.
- Validate the form before submitting (Client-Side Validation).
- The form could be a little bit more accessible to screen readers.
- Make the form allow both sign in and sign up, you can make it look like tabs and switch between them.

## Considerations

If you use any library/framework, you are expected to explain why you needed said libraries. So be mindful of the libraries you choose and always be responsible when applying them. For example you may use React/Vue/Angular but your task evaluation will vary based on the chosen framework.

## Things you will need

You would name to rename the file names from `.txt` to their appropriate extension, this is done to workaround security audits in google drive..

The API endpoint is:

https://private-b2e6827-robustatask.apiary-mock.com

The documentation for the end points you need can be found here:

https://robustatask.docs.apiary.io/#

## Evaluation

There is no fixed goals to check against, depending on the points you tackle and the enhancements you implement your evaluation will be varied from other candidates. However, **For bonus points, implement the solution without using a framework.**


## My work
- used validator.js library for Client-Side Validation, since provides a set of simple and readable validation functions for common use cases. It abstracts away the complexity of writing regular expressions for validation, making your code more concise and easier to understand.
- The password validation required a custom validation rules.
- didn't use framework, as mentioned (**For bonus points, implement the solution without using a framework.**).
- when user login an alert message will be appear instead of redirecting user.
- used fontawesome, google fonts, validator.js by adding the CDN.
- added dark & light themes.

