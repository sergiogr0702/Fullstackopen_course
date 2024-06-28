import PropTypes from 'prop-types';
import StatisticLine from './StatisticLine';

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad;
    const average = (good - bad) > 0 ? (good - bad) / all : 0;
    const positive = (good / all) * 100;

    return (
        <div>
            {
                all > 0 ?
                    <table>
                        <tbody>
                            <tr>
                                <StatisticLine text='Good' value={good}/>
                            </tr>
                            <tr>
                                <StatisticLine text='Neutral' value={neutral}/>
                            </tr>
                            <tr>
                                <StatisticLine text='Bad' value={bad}/>
                            </tr>
                            <tr>
                                <StatisticLine text='All' value={all}/>
                            </tr>
                            <tr>
                                <StatisticLine text='Average' value={average}/>
                            </tr>
                            <tr>
                                <StatisticLine text='Positive' value={positive} percent/>
                            </tr>
                        </tbody>
                    </table>
                :
                    <p>No feedback given</p>
            }
        </div>
    );
}

Statistics.propTypes = {
    good: PropTypes.number,
    neutral: PropTypes.number,
    bad: PropTypes.number,
}

export default Statistics;