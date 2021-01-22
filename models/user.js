module.exports = (sequelize, DataType) => {
    return sequelize.define('Member', {
        idx : {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '회원 고유번호'
        },
        id : {
            type: DataType.STRING(50),
            allowNull: false,
            comment: '회원 ID'
        },
        pw : {
            type: DataType.STRING(100),
            allowNull: false,
            comment: '회원 비밀번호'
        },
        nickname : {
            type: DataType.STRING(100),
            allowNull: false,
            comment: '회원 닉네임'
        },
        type : { 
            type: DataType.STRING(20),
            allowNull: false,
            comment: 'SNS 회원가입 여부'
        },
        d_fine : {
            type: DataType.STRING(20),
            allowNull: false,
            defaultValue : '15',
            comment: 'SNS 회원가입 여부'
        }
    },{
        tableName: 'member',
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        paranoid: true
    });
}