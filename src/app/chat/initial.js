const createLogger = require( '../config/createLogger' );
const bootstrap = require( '../bootstrap' );

async function chatInitial() {
  let sel = undefined;
  let rootSel = '';
  let parentSel = '';
  let combo = '';
  
  const logger = createLogger( 'solo--chatInitial' );
  logger.info( '-- BEGINNING --' );
  const a = await bootstrap( 'chatInitial' );

  let pause = 1000;

  await a.page.waitForTimeout( pause );
  // Oopen chat if not open
  sel = 'div.chat-container';
  const chatOpen = await a.visibleCheck( sel );
  if ( !chatOpen ) {
    // action: Click.
    // what: footer chat icon
    sel = '#wc-footer > div > .footer-button__button > .footer-button__img-layer > .footer-button__chat-icon';
    await a.selClick( sel );
  };
  
  await a.page.waitForTimeout( pause );
  // action: visible
  // what: chat on right side
  parentSel = '#wc-container-right ';
  combo = parentSel + sel;
  const chatRightSide = await a.visibleCheck( combo );
  // If chat isn't popped out, pop it out
  if ( chatRightSide ) {
    sel = '.chat-header__header > .dropdown > .chat-header__dropdown-menu a';
    combo = parentSel + sel;
    await a.findElFromText( combo, 'Pop Out', 'click' );
  };
  
  await a.page.waitForTimeout( pause );
  // Chat should be popped out now
  parentSel = '#chat-window div.chat-container ';
  const chatPopped = await a.visibleCheck( parentSel );
  if ( !chatPopped ) {
    logger.error( 'chat should be popped out by now' );
    return false;
  };

  // crawl through all the elements and remove the span
  // Then search by text again
  sel = 'div.chat-receiver-list div.chat-receiver-list__menu > ul div.scroll-content > div > li > a';
  childSel = ' span.chat-receiver-list__appendix';
  combo = sel + childSel;
  const toSelection = async function( combo, text ) { 
    await a.page.$$eval( combo, els => {
      const purified = els
        .map( el => {
          const parent = el.parentNode;
          el.parentNode.removeChild( el );
          return parent;        
        } );

      purified
        .find( el => 
          el.textContent === text )
          .click();
    }, text );
  };

  await toSelection( combo, 'lol' );
};

module.exports = chatInitial;
