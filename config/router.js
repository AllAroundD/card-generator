const orm = require('./orm');

function router( app ){

    app.get('/', async (req, res)=>{
        res.render('index', {example: 'hello'})
    })

    app.get('/api/cards/:search?', async function(req, res) {
        // const search = req.params.search ? { due: req.params.due } : ''
        console.log( `[GET] getting list, search=${req.params.search}`)
        const list = await orm.getCard( req.params.search )

        res.send( list )
    })
    // addCard
    app.post('/api/cards', async function(req, res) {
        console.log( '[POST] we received this data:', req.body.name, req.body.desc, req.body.location, req.body.deckId, req.body.attributes )
        const saveResult = await orm.addCard( req.body.name, req.body.desc, req.body.location, req.body.deckId, req.body.attributes )
        console.log( `... insertId: ${saveResult.insertId} ` )
        res.send( { status: true, insertId: saveResult.insertId, message: 'Card inserted successfully' } )
    })
    // deleteCard
    app.delete('/api/cards/:id', async function(req, res) {
        const cardId = req.params.id
        console.log( `[DELETE] id=${cardId}` )
        const deleteResult = await orm.deleteCard( cardId )
        console.log( '... ', deleteResult )
        res.send( { status: true, message: 'Card Deleted successfully' } )
    })
    // saveCard
    app.put('/api/cards', async function(req, res) {
        console.log( '[PUT] we received this data:', req.body )
        if( !req.body.id ) {
            res.status(404).send( { message: 'Invalid id' } )
        }
        const saveResult = await orm.saveCard( req.body.id, req.body.name, req.body.desc, req.body.location, req.body.deckId, req.body.attributes )
        console.log( '... ', saveResult )

        if (saveResult.affectedRows === 0){
            postMsg = "Card doesn't exist"
            console.log('[PUT] saveDeck: ', postMsg)
            res.send( { status: false, message: postMsg } )
        } else {
            postMsg = 'Card Updated successfully'
            console.log('[PUT] saveDeck: ', postMsg)
            res.send( { status: true, message: postMsg } )
        }

    })
    /*
    // addCardAttributes
    app.post('/api/cards/attributes', async function(req, res) {
        console.log( '[PUT] we received this data:', req.body )
        if( !req.body.id ) {
            res.status(404).send( { message: 'Invalid id' } )
        }
        const saveResult = await orm.setCardAttributes( req.body.id, req.body.attributes )
        console.log( '... ', saveResult )
        res.send( { status: true, message: 'Card Updated successfully' } )
    })
    */

    // addDeck
    app.post('/api/decks', async function(req, res) {
        console.log( '[POST] we received this data:', req.body.name )
        const saveResult = await orm.addDeck( req.body.name )
        console.log( `... insertId: ${saveResult.insertId} ` )
        res.send( { status: true, insertId: saveResult.insertId, message: 'Deck inserted successfully' } )
    })

    // deleteDeck
    app.delete('/api/decks/:id', async function(req, res) {
        const deckId = req.params.id
        console.log( `[DELETE] id=${deckId}` )
        const deleteResult = await orm.deleteDeck( deckId )
        console.log( '... ', deleteResult )
        res.send( { status: true, message: 'Deck Deleted successfully' } )
    })

    // saveDeck
    app.put('/api/decks', async function(req, res) {
        console.log( '[PUT] we received this data:', req.body )
        if( !req.body.deckId ) {
            res.status(404).send( { message: 'Invalid id' } )
        }
        const saveResult = await orm.saveDeck( req.body.deckId, req.body.deckName )
        console.log( '... ', saveResult )
        let postMsg = ''
        if (saveResult.affectedRows === 0){
            postMsg = "Deck doesn't exist"
            console.log('[PUT] saveDeck: ', postMsg)
            res.send( { status: false, message: postMsg } )
        } else {
            postMsg = 'Deck Updated successfully'
            console.log('[PUT] saveDeck: ', postMsg)
            res.send( { status: true, message: postMsg } )
        }

    })

}

module.exports = router