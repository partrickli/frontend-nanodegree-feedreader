/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
      it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
      it('feed url available', function() {
        allFeeds.forEach((feed) => {
          expect(feed.url).toBeDefined();
          expect(typeof feed.url).toBe('string');
          expect(feed.url).not.toBe('');
        });
      });

      /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
      it('feed name available', function() {
        allFeeds.forEach((feed) => {
          expect(feed.name).toBeDefined();
          expect(typeof feed.name).toBe('string');
          expect(feed.name).not.toBe('');
        });
      });
    });

    /**
     * test suite named "The menu"
     */
    describe('The menu', () => {
      /**
       * Test menu hidden by default.
       */
      it('menu hidden', () => {
        const body = document.querySelector('body');

        expect(body.classList[0]).toBe('menu-hidden');
      });

      /**
       * Test that ensures the menu changes visibility when the menu icon is clicked.
       */
      it('menu click', () => {
        const button = document.querySelector('a.menu-icon-link');
        const body = document.querySelector('body');

        // Test click menu icon and hide menu
        button.click();
        expect(body.classList[0]).not.toBeDefined();

        // Test click menu icon again and show menu
        button.click();
        expect(body.classList[0]).toBe('menu-hidden');
      });
    });

    /**
     *  Test suite for initial entries
     */
    describe('Initial Entries', () => {
      /**
       * call async function loadFeed, and test when it's done.
       */
      beforeEach((done) => {
        loadFeed(0, () => {
          done();
        });
      });

      it('load feed', (done) => {
        // Div with class feed should exist
        const feed = document.querySelector('div.feed');
        expect(feed).toBeDefined();

        // At least one entry in the feed
        const entries = feed.querySelectorAll('.entry');
        expect(entries).toBeDefined();
        expect(entries.length).toBeGreaterThan(0);
        done();
      });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
  })()
);
