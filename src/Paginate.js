
import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';  
import _ from "lodash"


const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';



class Pagination extends Component {
    constructor(props) {
      super(props);
      const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;
  
      this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
      this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
  
      // pageNeighbours can be: 0, 1 or 2
      this.pageNeighbours = typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;
  
      this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
    
      this.state = { currentPage: 1 };
    }


    componentDidUpdate = (prevProps, prevState) => {
      if (prevProps.totalRecords !== this.props.totalRecords) {
        this.totalRecords = this.props.totalRecords
        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit)
        this.gotoPage(1);
    }
  }

    fetchPageNumbers = () => {
        const totalPages = this.totalPages;
        const currentPage = this.state.currentPage;
        const pageNeighbours = this.pageNeighbours;
    
        /**
         * totalNumbers: the total page numbers to show on the control
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */
        const totalNumbers = (this.pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;
    
        if (totalPages > totalBlocks) {
          const startPage = Math.max(2, currentPage - pageNeighbours);
          const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
          let pages = _.range(startPage, endPage + 1);
          console.log(pages)
          /**
           * hasLeftSpill: has hidden pages to the left
           * hasRightSpill: has hidden pages to the right
           * spillOffset: number of hidden pages either to the left or to the right
           */
          const hasLeftSpill = startPage > 2;
          const hasRightSpill = (totalPages - endPage) > 1;
          const spillOffset = totalNumbers - (pages.length + 1);
    
          switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case (hasLeftSpill && !hasRightSpill): {
              const extraPages = _.range(startPage - spillOffset, startPage);
              pages = [LEFT_PAGE, ...extraPages, ...pages];
              break;
            }
    
            // handle: (1) {2 3} [4] {5 6} > (10)
            case (!hasLeftSpill && hasRightSpill): {
              const extraPages = _.range(endPage + 1, endPage + spillOffset + 1);
              pages = [...pages, ...extraPages, RIGHT_PAGE];
              break;
            }
    
            // handle: (1) < {4 5} [6] {7 8} > (10)
            case (hasLeftSpill && hasRightSpill):
            default: {
              pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
              break;
            }
          }
    
          return [1, ...pages, totalPages];
        }
    
        return _.range(1, totalPages + 1);
      }

      render() {
        if (!this.totalRecords || this.totalPages === 1) return null;
    
        const { currentPage } = this.state;
        const pages = this.fetchPageNumbers();
    
        return (
          <Fragment>
            <div className="pagination-container"  aria-label="Pagination">
              <ul className="pagination">
                { pages.map((page, index) => {
    
                  if (page === LEFT_PAGE) return (
                    <li key={index} className="page-item previous">
                      <a className="page-link link-2 previous" href="#" aria-label="Previous" onClick={this.handleMoveLeft}>
                        <div aria-hidden="true"><h3>&#171;</h3></div>
                      </a>
                    </li>
                  );
    
                  if (page === RIGHT_PAGE) return (
                    <li key={index} className="page-item next">
                      <a className="page-link link-2 next" href="#" aria-label="Next" onClick={this.handleMoveRight}>
                        <div aria-hidden="true"><h3>&#187;</h3></div>
                      </a>
                    </li>
                  );
    
                  return (
                    <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                      <a className="page-link link-2" href="#" onClick={ this.handleClick(page) }><h3>{ page }</h3></a>
                    </li>
                  );
    
                }) }
    
              </ul>
            </div>
          </Fragment>
        );

        
      }

      componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;
    const currentPage = Math.max(0, Math.min(page, this.totalPages));
    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  }

  handleClick = page => evt => {

    this.gotoPage(page);
  }

  handleMoveLeft = evt => {

    this.gotoPage(this.state.currentPage - 1);
  }

  handleMoveRight = evt => {

    this.gotoPage(this.state.currentPage + 1);
  }
    
  }
  
  Pagination.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    pageNeighbours: PropTypes.number,
    onPageChanged: PropTypes.func,
  };

  
  
  export default Pagination;