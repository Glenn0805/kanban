import { Card } from 'antd'

const BoardComponent = ({ borderColor = "" }) => {
    return (
        <>
            <Card className='w-auto mb-3 border-l-8 cursor-pointer hover:scale-105 transition ease-in-out delay-75' style={{ borderLeftColor: borderColor }}>
                This Is BOard
            </Card>
        </>
    )
}

export default BoardComponent