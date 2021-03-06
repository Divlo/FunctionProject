import SwipeableViews from 'react-swipeable-views'

const FunctionTabs = props => {
  return (
    <div className='container-fluid'>
      <SwipeableViews
        onChangeIndex={index => props.setSlideIndex(index)}
        index={props.slideIndex}
      >
        {props.children}
      </SwipeableViews>
    </div>
  )
}

export default FunctionTabs
