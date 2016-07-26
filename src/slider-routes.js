import React from 'react';

export const RouterHistory = {};

export const Slider = class TransitWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: location.hash.substring(1) || 'page-one'
    };
    this.transition = this.transition.bind(this);
    RouterHistory.push = this.transition;
  }

  componentDidMount() {
    window.onpopstate = e => {
      this.transition(location.hash.substring(1), 'right')
    }
    this.refs.transBox.addEventListener('transitionend', () => {
      this.setState({
        currentPage: this.state.toPage,
        toPage: null,
        direction: null
      })
    })
  }

  transition(page, direction) {
   const routePrefix = this.props.hashHistory ? '#' : '';
    this.setState({
      toPage: page,
      direction
    });
    window.history.pushState({direction, page}, null, `${routePrefix}${page}`)
  }

  render() {
    const styles = {
      view: {
        width: '100vw',
        height: '100vh',
      },
      pages: {
        width: '300vw',
        height: '300vh',
        position:'absolute',
        top: '-100vh',
        left: '-100vw'
      },
      pageUp: {
        width: '100vw',
        height: '100vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxSizing: 'border-box'
      }, 
      pageDown: {
        width: '100vw',
        height: '100vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxSizing: 'border-box'
      },     
      pageLeft: {
        position:'relative',
        width: '100vw',
        height: '100vh',
        display: 'inline-block',
        boxSizing: 'border-box'
      },
      currentPage: {
        position:'relative',
        width: '100vw',
        height: '100vh',
        display: 'inline-block',
        boxSizing: 'border-box'
      },
      pageRight: {
        position:'relative',
        width: '100vw',
        height: '100vh',
        display: 'inline-block',
        boxSizing: 'border-box'
      }
    };


    let currentPage;
    let pageLeft;
    let pageRight;
    let pageUp;
    let pageDown;

    React.Children.forEach(this.props.children, (page, index) => {
      if(page.key === this.state.currentPage) {
        const pageWithLoadedProp = React.cloneElement(page, {
          isLoaded: true
        });
        currentPage = (
          <div style={styles.currentPage}>
            {pageWithLoadedProp}
          </div>
        );
      } else if(page.key === this.state.toPage) {
        if(this.state.direction === 'left') {

          pageLeft = (
            <div style={styles.pageLeft}>
              {page}
            </div>
          );
          styles.pages.left = 0;
          styles.pages.transition = 'left 300ms ease-in-out';
        } else if(this.state.direction === 'right') {
          pageRight = (
            <div style={styles.pageRight}>
              {page}
            </div>
          );
          styles.pages.left = '-200vw';
          styles.pages.transition = 'left 300ms ease-in-out';
        } else if(this.state.direction === 'up') {
          pageUp = (
            <div style={styles.pageUp}>
              {page}
            </div>
          );
          styles.pages.top = '0vh';
          styles.pages.transition = 'top 300ms ease-in-out';
        } else if(this.state.direction === 'down') {
          pageDown = (
            <div style={styles.pageDown}>
              {page}
            </div>
          );
          styles.pages.top = '-200vh';
          styles.pages.transition = 'top 300ms ease-in-out';
        }
      }
    });

    return (
      <div style={styles.view}>
        <div style={styles.pages} ref="transBox">
          <div style={styles.pageUp}>{pageUp}</div>
          <div style={styles.pageLeft}>{pageLeft}</div><div style={styles.currentPage}>{currentPage}</div><div style={styles.pageRight}>{pageRight}</div>   
          <div style={styles.pageDown}>{pageDown}</div>
        </div>
      </div>
    );
  }
}
