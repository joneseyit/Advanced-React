import React from 'react'
import PaginationStyles from './styles/PaginationStyles'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Link from 'next/link'
import { perPage } from '../config';
import Head from 'next/head';

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }

    }
`

const Pagination = props => {
    return (
        <Query query={PAGINATION_QUERY}  >
            {({data, loading, error}) => {
                if(loading) return <p>Loading...</p>
                const count = data.itemsConnection.aggregate.count
                const pages = Math.ceil(count / perPage);
                const page = props.page
                return (
                    <PaginationStyles>
                        <Head>
                            <title>Sick Fits! Page {page} of {pages}  </title>
                        </Head>
                        <Link
                            //preloads the next and the previous page so they are ready works in production
                            prefetch 
                            href={{
                            pathname: 'items',
                            query:  { page: page - 1}
                        }} >
                        <a className="prev" aria-disabled={page <= 1} > Prev</a>
                        </Link>
                        <p>Page {props.page} {pages} </p>
                        <p>{ count } Items Total</p>

                        <Link
                            //preloads the next and the previous page so they are ready works in production
                            prefetch 
                            href={{
                            pathname: 'items',
                            query:  { page: page + 1}
                        }} >
                        <a className="prev" aria-disabled={page >= pages} > Next</a>
                        </Link>
                    </PaginationStyles> 
                )
            }}
        </Query>
    )
}

export default Pagination