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
        },
        salt : {
            type: DataType.STRING(255),
            allowNull: false,
            comment: '각 회원별 salt Value'
        }
    }, 
    {
        tableName : 'member',
        underscored : true,
        timestamps: true,
        paranoid: true,
        freezeTableName : true,
        hooks: {
           beforeCreate: function (person, options, fn) {
               person.createdAt = new Date();
               person.updatedAt = new Date();
               fn(null, person);
           },
           beforeUpdate: function (person, options, fn) {
               person.updatedAt = new Date();
               fn(null, person);
           }
       }
    });
}