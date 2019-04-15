const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const Mutations = {
    async createItem(parent, args, ctx, info){
        //TODO check if they are logged in
        const item = await ctx.db.mutation.createItem(  
            {    
            data: {
                ...args
                
            } 
        }, info);
        return item;
    },
    updateItem(parent, args, ctx, info) {
        //first take a copy of updates
        const updates = { ...args };
        delete updates.id;
        //run the update method
        return ctx.db.mutation.updateItem({ 
            data: updates,
            where: {
                id: args.id
            },

         }, info)
    },
    async deleteItem(parent, args, ctx, info) {
        //wanna make a 'where' var 
        const where = { id: args.id };
        //find the item
                                          //right here we are passing in raw graphql and it will parse it for us
        // const item = await cptx.db.item({ where }, `{id title}`)
        //check if they own the item or have the permissions
        // TODO
        //delete it
        return ctx.db.mutation.deleteItem({ where }, info)
        //query the item first to check and see if the person owns it or if they have permission to delete it
                  
    },

    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase();
        //hash their password
        const password = await bcrypt.hash(args.password, 10);
        // create the user in the db 
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password: password,
                permissions: { set: ['USER'] }
            } 
        }, info);
        //create JWT for them
        const token = jwt.sign({ userId: user.id}, process.env.APP_SECRET )
        // set the JWT as a cookie on response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 *60 * 24 * 365
        })
        //return user to browser 
        return user
    }
};

module.exports = Mutations;
