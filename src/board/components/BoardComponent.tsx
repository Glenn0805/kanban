import { Card } from 'antd'

const BoardComponent = ({ borderColor = "",boardName="" }) => {
    return (
        <>
            <Card className='w-auto mb-3 border-l-8 cursor-pointer hover:scale-105 transition ease-in-out delay-75' style={{ borderLeftColor: borderColor }}>
                {boardName.toUpperCase()}
            </Card>
        </>
    )
}

export default BoardComponent