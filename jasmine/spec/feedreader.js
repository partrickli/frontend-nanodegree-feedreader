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
    /**
     * This suite is all about the RSS feeds definitions, the
     * allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
      /**
       * Make sure that the allFeeds variable has been defined
       * and that it is not empty
       */
      it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /** A test that loops through each feed
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

      /** A test that loops through each feed
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

        expect(body.classList).toContain('menu-hidden');
      });

      /**
       * Test that ensures the menu changes visibility when the menu icon is clicked.
       */
      it('menu click', () => {
        const button = document.querySelector('a.menu-icon-link');
        const body = document.querySelector('body');

        // Test click menu icon and hide menu
        button.click();
        expect(body.classList.contains('menu-hidden')).toBe(false);

        // Test click menu icon again and show menu
        button.click();
        expect(body.classList.contains('menu-hidden')).toBe(true);
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

    describe('New Feed Selection', () => {
      let firstFeedHeaders = [];
      let secondFeedHeaders = [];
      /** A test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */

      beforeEach((done) => {
        loadFeed(0, function() {
          // memorize previous title of entries for comparison
          const entries = document.querySelectorAll('.entry');
          firstFeedHeaders = [...entries].map((entry) => {
            return entry.querySelector('h2').innerText;
          });

          // laod new feed
          const headerTitle = document.querySelector('.header-title').innerText;
          loadFeed(1, () => {
            const entries = document.querySelectorAll('.entry');
            secondFeedHeaders = [...entries].map((entry) => {
              return entry.querySelector('h2').innerText;
            });
            done();
          });
        });
      });

      it('load feed', (done) => {
        expect(firstFeedHeaders).not.toEqual(secondFeedHeaders);

        done();
      });
    });
  })()
);
