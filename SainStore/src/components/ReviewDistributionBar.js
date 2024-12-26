const ReviewDistributionBar = ({ count, total }) => {
    const barWidth = total > 0 ? (count / total) * 100 : 0;

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', marginLeft:"20px"}}>
            <div style={{ width: '200px', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${barWidth}%`, backgroundColor: '#ffc107', height: '10px' }}></div>
            </div>
            <span style={{ marginLeft: '10px' }}>{count}</span>
        </div>
    );
};


export default ReviewDistributionBar;