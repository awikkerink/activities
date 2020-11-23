/* eslint quotes: 0 */

export const val = {
	activitiesAvailable: "Activities that are due or ending in two weeks are complete! Check View All Work to see what's coming later.", // 'Empty View' - When widget has no activities to display within the next two weeks, but there are more activities further into the future that can be shown on the full screen view
	dateHeader : "{startMonth} {startDay} - {endMonth} {endDay}", // Indicates that the below list of activities are due/end within the listed date range
	fullViewLink: "View all work", // Link text displayed in "Activities View", where the user can navigate to the full page view to see all work
	goToDiscover : "Go To Discover", // Button text displayed in 'Empty View' when user can navigate to discover homepage from the widget
	myWorkToDo: "My Work To Do", // Widget title
	noActivitiesDiscoverActive : "You have no activities due or ending in the next two weeks. Check out Discover to find more learning.", // 'Empty View' - When widget has no activities to display within the next two weeks, but discover is active and can be navigated to by interacting with the provided element
	noActivitiesDiscoverInactive : "You have no activities with due or end dates available.", // 'Empty View' - When widget has no activities to display within the next two weeks & there are no more activities in the future & discover is not active for this user
	nothingHere : "There\'s nothing here...", // Displayed as header line in widget text when there are no activities within the provided time period
	overdue : "Overdue", // Indicates that the below list of activities are overdue (have a due date that is in the past)
	upcoming : "Upcoming Work", // Indicates that the below list of activites are upcoming (have a due due or end date that is in the future)
	viewAllWork : "View All Work", // Button text displayed in 'Empty View' when user can navigate to full page view to see all work
};
