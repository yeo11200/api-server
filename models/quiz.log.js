module.exports = (sequelize, DataType) => {
    return sequelize.define('QuizLog', {
        idx : {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '퀴즈로그'
        },
        mId : {
            type: DataType.INTEGER,
            allowNull: false,
            comment: '회원 고유번호'
        },
        qId : {
            type: DataType.INTEGER,
            allowNull: false,
            comment: '퀴즈 고유번호'
        },
        step : {
            type: DataType.INTEGER,
            allowNull: false,
            comment: '퀴즈의 스텝'
        }, 
        passYn : {
            type: DataType.ENUM('Y', 'N'),
            allowNull: false,
            comment: '해당 스텝에 통과여부'
        }
    },{
        tableName : 'quiz-log',
        underscored : true,
        timestamps: true,
        paranoid: true,
        freezeTableName : true  
    })
}