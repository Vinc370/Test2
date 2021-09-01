import { connect } from 'react-redux'
import './ProgressBar.scss'

function ProgressBar({current, total, data, name}) {
    const len = current < 1 ? 1 : current;
    return (
        <div className="d-flex justify-content-center w-100">
            <div className="progress-bar-container w-100">
                <div className="line-progress-bar"></div>
                <div className="line-progress-bar bg-primary" style={{width: (((len-1)/(total-1))*100)+'%'}}></div>
                <div className="bullet-container">
                    {
                        data?.map((item, k) => (
                            <div className="bullet-and-text" key={k}>
                                <div className={"bullet-progress "+(k+1 <= current ? "active" : "")}>
                                    {k+1}
                                </div>
                                <div className="flying-text">
                                    {item[name]}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default connect(null, null)(ProgressBar)