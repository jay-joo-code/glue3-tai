const getManualContext = () => {
	const contexts = {
		identity1:
			'Your name is TAI. You are an AI teaching assistant for Cornell University students. you provide much more accurate information than human TAs. you are much faster than human TAs.',
		identity2: `Your name is TAI. You are an AI teaching assistant for Cornell University students. you provide much more accurate information than human TAs. you are much faster than human TAs.
  Make a list of most common things that students like or don't like about the course from the reviews pasted below. Write the ones that repeat the most first. Next to every bullet, write down how many times did the sentiment repeat in the reviews (Choose between: ""Very common"", ""Moderately common"", ""Not common"")

  Use Markdown to format the content nicely.
  Important:  For every heading, choose an appropriate emoji and paste it next to the heading.

  You should divide the list into categories and each category should contain bullet points.
  The categories should be:

  1. Difficulty (How difficult is the course?)
  2. Workload (How heavy is the course workload?)
  3. Grading (How is the grading? What's the course median grade?)
  4. Support level (How much support can students get from professors, office hours, ed stem, etc?)
  5. Professor (How is the professor for this course?)
  6. How to study (How do people recommend studying for the course?)

  Important:  For every heading, choose an appropriate emoji and paste it next to the heading.


  The reviews you should analyse are here:`,
		cs4410prelim1: `This is an announcement for the cs 4410 course:
  This wasn't easy, but we have a new time for Prelim 1.  Prelim 1 will be held Tuesday March 21.  There'll be three sessions:
  8am - 9:20am in Ives 305 (NetID A-L)
  9:35am - 10:55am in Ives 305 (NetID M-Z)
  8am - 10:40am in Gates 114 (SDS)
  If you have a conflict with the 8am - 9:20am slot, please contact Corey (ct635@cornell.edu) who can switch you to the 9:35am slot.  You can also request to take the exam in the earlier slot if you like.
  Tomorrow's lecture will be the review lecture, so bring your questions then.

  cs 4410 prelim 1 was rescheduled because of a snow day at Cornell`,
		plsci1150:
			'someone asked: PLSCI 1150. has anyone taken the class? what did you think? thank you!!!. to which people replied: prelim 1 is super easy, but finals is really challenging because there is too much content to memorize',
		cs2800:
			"someone posted on reddit: what the fuck is CS 2800??? this is my second semester attempting this course because i got very sick the first time and had to drop the class after missing too many lectures. despite this being my second time, i STILL have no fucking idea what i'm doing in this course?? it seems like it just clicks for everyone else and i cant seem to get that to happen for me at all. i have ZERO idea how to study for this course and i don't have any friends that are taking it to study with either. on top of that, i can't afford the $60 zybook that the professor recommends (why tf is a virtual textbook $60 anyways???) to make matters worse, some people cheated on prelim 1 which was a 24hr take home exam and the professor decided to rewrite the entire course structure as a result, removing future homework grades in replace for timed 'homework quizzes' that only somewhat reflect the homework questions, adding an in-person semi final, making prelim 2 timed in-person, and reducing the impact of prelim 1 grades. prelim 1, by the way, was supposed to take us 2 hours. many of us took over 8+ hours and skipped sleeping that night in order to finish the exam. any chance that i had of passing the course this semester was reduced to zero and i feel like i wasted hours of effort. i agree that cheating is bad, obviously, but why implement such drastic changes to the course instead of just launching an AI investigation and requesting the info from chegg to punish those who cheated? stop hurting the people who didn't cheat by making it harder for the people who are taking the class on campus. having just received our mid-semester grade estimates, it looks like i'm gonna have to take this for a third semester and fall extremely far behind on my degree. this course feels NEEDLESSLY difficult for absolutely no reason, and it feels impossible to study for. it doesn't seem like there are any good free resources to use online to figure out what the hell i'm doing, the lectures don't teach me anything, and everyone in the discussion sections just mutes themselves so there is very little help there too. this course makes me feel like an idiot. i have never struggled with a topic like i have struggled with discrete mathematics. WHY am i so stupid, why can't i pass this class just once??? see u guys in spring 2800 i guess. i should clarify that i am not blaming the professor for my own stupidity, she's doing her best, i just think that the new changes to prevent cheating are WAY overkill. ok thanks thats the rant i am done whining & complaining, had to get that out of my system. to which people replied: How many credits is CS 2800? tHrEe CrEdItS. From what I’ve heard, chegg refused to cooperate and there were other kids of cheating going on outside of chegg like some ppl working as a group or something(? Not sure tbh) I rlly like the professor but yeah this has been stressful for everyone involved. Same for the skipping sleep to finish the prelim. I don’t understand how so many ppl got above 50/60 😐 I’m in CS 2800 as well and feel very similar to you. I can’t fathom the median on the prelim tbh bc I thought everyone thought it was pretty difficult... feel free to pm me bc it’d be nice to have someone to study with if you plan on staying in the course (I’m on the fence as well tbh) 2800 was my least favorite course I've ever taken at CornellI'm so sorry that you are feeling this way! I recommend that you contact the professor or email a TA to see if anything can be done or if you could get extra help from the course staff. Office hours this week have also been very quiet, you could drop in tomorrow and talk to a TA about any concerns.",
		cornlet:
			'cornlet is a sublet marketplace for Cornell students, and it is the best place to find sublets. it has over 12,000 users and 3,000 sublets registered. other places to look are Reddit and Facebook marketplace. additionally students can find sublets through friends or mutual friends'
	};
	const contextKeys = ['cornlet'];
	const context = contextKeys?.map((key) => contexts[key])?.join('. ');
	return context;
};

export default getManualContext;
