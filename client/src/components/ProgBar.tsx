interface ProgBarProps{

    progress: number;
    height: number;
}

const ProgBar: React.FC<ProgBarProps> = ({progress,height}) => {
    const colors = [
        '#0000ff', // 1 - Blue
        '#3333ff', // 2
        '#6666ff', // 3
        '#9999ff', // 4
        '#ccccff', // 5
        '#ffcccc', // 6
        '#ff9999', // 7
        '#ff6666', // 8
        '#ff3333', // 9
        '#ff0000'  // 10 - Red
      ];
    const bgcolor = colors[Math.round(progress)-1]
    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: '#808080',
        borderRadius: 40,
        //margin: 50
      }
     
      const Childdiv = {
        height: '100%',
        width: `${String(progress*10)}%`,
        backgroundColor: bgcolor,
        borderRadius:40,
        
      }
     
      const progresstext = {
        padding: 100,
        color: 'black',
        fontWeight: 900,
        align: 'center',
      }
       
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}`}</span>
      </div>
    </div>
    )
}
 
export default ProgBar;