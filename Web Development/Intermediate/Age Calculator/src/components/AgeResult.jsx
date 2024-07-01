import React from 'react'
import PropTypes from 'prop-types';


const AgeResult = ({age}) => {
    return (
      <div>
        <h3 className='text-2xl text-center mt-10'>You are <span className='font-bold text-red-800'>{age.years}</span> years, <span className='font-bold text-red-800'>{age.months}</span> months and <span className='font-bold text-red-800'>{age.days}</span> days old.</h3>
      </div>
    )
}
AgeResult.propTypes = {
    age: PropTypes.shape({
        years: PropTypes.number.isRequired,
        months: PropTypes.number.isRequired,
        days: PropTypes.number.isRequired,
    })
};
export default AgeResult