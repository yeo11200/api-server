module.exports = (sequelize, DataType) => {
    return sequelize.define('QuizStep', {
        idx : {
            primaryKey : true,
            autoIncrement : true,
            type: DataType.INTEGER,
            comment :  '스텝 고유번호'
        },
        step : {
            type: DataType.INTEGER,
            allowNull: false,
            comment :  '스텝'
        },
        stepTitle : {
            type: DataType.STRING(50),
            allowNull: false,
            comment :  '스텝 제목'
        }
    },{
        tableName : 'quiz-step',
        underscored : true,
        timestamps: true,
        paranoid: true,
        freezeTableName : true  
    })
}