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
                  
    }
};

module.exports = Mutations;
