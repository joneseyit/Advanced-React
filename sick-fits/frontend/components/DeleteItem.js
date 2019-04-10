import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ALL_ITEMS_QUERY } from './Items'

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id) {
            id
        }
    }
`
class DeleteItem extends Component {
    update = (cache, payload) => {
        //so we called on a preset method of mutation called update, with this handler update
        // it takes in the cache, and a payload
        //manually update the cache on the client so it matches 
        //the server
        //1. Read the cache for the items we want
            //use graphql to read from the cache and write back into the cache
            //in "Items.js" we used the ALL_ITEMS_QUERY to get them on the page
        const data = cache.readQuery({ query: ALL_ITEMS_QUERY })
        
        //2. filter the deleted item out of the page
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id)           
        //3 put the items back
        console.log(data.items, "dataitems")
        cache.writeQuery({ query: ALL_ITEMS_QUERY, data })
    }

    render() {
        return (
            <Mutation 
            mutation={DELETE_ITEM_MUTATION} 
            variables={{id: this.props.id}} 
            update={this.update}
            >
                {(deleteItem, { error } ) => ( 
                    <button onClick={ () => {
                        if(confirm('Are you sure you want to delete this?'))
                        deleteItem()
                    }}
            >{this.props.children}</button>
                )}
                
            </Mutation>
        );
    }
}

export default DeleteItem;