# Mental Math

A multi-player, multi-screen game built to experiment with Socket.IO and Node.js. This is a fork of [Anagrammatix](https://github.com/ericterpstra/anagrammatix)

There is a working demo up at [mental-math.herokuapp.com](https://mental-math.herokuapp.com).

## To Play

### Setup
1. Visit [mental-math.herokuapp.com](mental-math.herokuapp.com) on a PC, Tablet, SmartTV or other large screen device
2. Click CREATE
3. On a mobile device, visit [mental-math.herokuapp.com](mental-math.herokuapp.com).
4. Click JOIN on the mobile device screen.
5. Follow the on-screen instructions to join a game.
6. Find an opponent and have him/her repeat steps 3-5 on another mobile device.

### Gameplay
1. On the large screen (the game Host), a math expression will appear.
2. On each players' devices, a list of possible answers will appear.
3. The players must calculate the correct answer and select it from the list of answers on the mobile device.
4. The player who taps the correct answer first gets 5 points.
5. Tapping an incorrect answer will subtract 3 points.
5.1. After 3 incorrect guesses, the expression is marked as 'difficult' and is added to a CouchDB database, accessible as an API at [mental-math.herokuapp.com/api](mental-math.herokuapp.com/api)
6. The player with the most points after 10 rounds wins!


### Why?

I really wanted to experiment with the Socket.IO library and build something useful that takes advantage of its speed. I came across the Anagrammatix game and decided to use it as a boilerplate for my project. I left the core of the app as-is, but had to implement my own logic for generating the math expressions and several events.

### Challenges

This was probably the first project that I did not start from scratch. In my opinion, working with someone else's code is a crucial skill to have in the industry. In order to be able to implement new features, I needed to go thoroughly through the code and undestand how every function worked. With Socket.IO, I needed to track the state of the app, as the host and the client were communicating by events. It still took me a substantial amount of time to make this work, but now I am much more comfortable with using Socket.IO and am planning to seek out projects to contribute to that use this library.

### Resources

[Socket.IO](http://socket.io/)

[FastClick.js](https://ftlabs.github.io/fastclick/) - elimiate the 300ms between a physical tap and the firing of the `click` event on mobile browsers.

[TextFit.js](http://strml.github.io/examples/textFit.html) - quickly fit single and multi-line text to the width of its container.

[Anagrammatix](https://github.com/ericterpstra/anagrammatix) - the original Anagrammatix game.
