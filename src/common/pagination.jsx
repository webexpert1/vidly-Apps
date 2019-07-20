import React from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash';

const Pagination = props => {
        const { itemsCount, pageSize, currentPage } = props;

        const pagesCount = Math.ceil(itemsCount/pageSize);

        if(pagesCount === 1) return null;

        const pages = _.range(1, pagesCount + 1);
        console.log(currentPage);

        return (
            <div>
               <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {pages.map(page => (
                            <li key={page} className={ page === currentPage ? 'page-item active': 'page-item' }><a onClick={() => props.onPageChange(page)} className="page-link" href="#">{page}</a></li> 
                        ))}
                                              
                    </ul>
                    </nav> 
            </div>
        )
}

Pagination.propTypes = {
    itemsCount: PropTypes.string.isRequired, 
    pageSize: PropTypes.string.isRequired,
    currentPage: PropTypes.func.isRequired
}
export default Pagination;
