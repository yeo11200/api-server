module.exports = (sequelize, DataType) => {
    return sequelize.define('Member', {
        idx : {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '회원 고유번호'
        },
        email : {
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
        },
        deleteAt : {
            // 'TIMESTAMP' : timestamp의 type
            type: DataType.DATE,
            allowNull: true
        },
        lastLoginAt : {
            type: DataType.DATE,
            allowNull: false,
            comment: '마지막 로그인 날짜'
        }
    }, 
    {
        tableName : 'member',
        // data를 업데이트 할 때 대문자로 적어줘야 update가 가능하다.
        // lastLoginAt === last_login_at
        underscored : true,
        timestamps: true,
        paranoid: true,
        freezeTableName : true,
        hooks: {
           beforeCreate: function (person, options, fn) {
               person.createdAt = new Date();
               person.updatedAt = new Date();
               sequelize.fn(null, person);
           },
           beforeUpdate: function (person, options, fn) {
               person.updatedAt = new Date();
               sequelize.fn(null, person);
           }
       }
    });
}