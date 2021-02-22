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
        step : {
            type: DataType.INTEGER,
            allowNull: false,
            comment: '퀴즈의 스텝'
        }
    },{
        tableName : 'quiz-log',
        underscored : true,
        timestamps: true,
        paranoid: true,
        freezeTableName : true  
    })
}