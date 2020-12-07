const createLogger = require( '../config/createLogger' );

async function initialStrap( a, name ) {
  let sel = undefined;
  let rootSel = '';
  const logger = createLogger( `${ name }--initialStrap` );

  logger.info( '-- BEGINNING --' );

  // Optionally refresh when necessary
  if ( process.env.RELOAD ) {
    await a.page.reload( { 
      waitUntil: [
        'networkidle0', 
        'load', 
        'domcontentloaded' 
    ] } );
    await a.page.waitForTimeout( 1000 );
  };
  
  // Launch meeting page
  sel = '#root > div > .form > .MuiButtonBase-root > .MuiButton-label';
  const onIntroPage = await a.visibleCheck( sel );
  if ( onIntroPage ) {
    await a.page.waitForTimeout( 1500 );
    await a.selClick( sel );
    await a.page.waitForTimeout( 2500 );
  };

  rootSel = '.join-dialog > div > .zmu-tabs > .zmu-tabs__tab-container';
  const overlayVisible = await a.selClick( rootSel );
  if ( overlayVisible ) {
    // Next 2 are just to click things just to make sure things are working
    // sel = ' > .zmu-tabs__tabs-list > #voip > .tab-bar-node';
    // await a.selClick( rootSel + sel );
    
    // sel = ' > .zmu-tabs__tabs-list > #phone > .tab-bar-node';
    // await a.selClick( rootSel + sel );
    
    sel = ' > .zm-btn';
    await a.selClick( rootSel + sel );
  };
};

module.exports = initialStrap;
