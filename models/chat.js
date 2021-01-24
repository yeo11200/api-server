module.exports = async (sequelize, DataType) => {

    const chat = sequelize.define('Chat', {
        idx : {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '채팅 고유번호'
        },
        sender : {
            type: DataType.INTEGER,
            allowNull: false,
            comment: '채팅 보낸 사람'
        },
        recipient : {
            type: DataType.INTEGER,
            allowNull: false,
            comment: '채팅 받는 사람'
        }
    },{
        tableName : 'chat-log',
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

    return chat;
}