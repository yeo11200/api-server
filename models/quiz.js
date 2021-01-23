module.exports = (sequelize, DataType) => {
    return sequelize.define('Quiz', {
        idx: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '퀴즈 고유ID'
        },
        questions: {
            type: DataType.TEXT,
            allowNull: false,
            comment: '퀴즈 질문'   
        },
        anwsers: {
            type: DataType.TEXT,
            allowNull: false,
            comment: '퀴즈에 대한 답'
        },
        lists: {
            type: DataType.TEXT,
            allowNull: true,
            comment: '퀴즈 질문 리스트'
        },
        type: {
            type: DataType.ENUM('short', 'chioce'),
            allowNull: false,
            defaultValue : 'chioce',
            comment: '질문 상태 : short(주관식), chioce(객관식)'
        },
        step : {
            type: DataType.INTEGER,
            allowNull: false,
            comment: '퀴즈 스텝'
        }
    }, {
        tableName : 'quiz',
        underscored : true,
        timestamps: true,
        paranoid: true,
        freezeTableName : true       
    })
}