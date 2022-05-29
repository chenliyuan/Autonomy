#!/user/bin/expect
set password "Snowypml188"
set timeout 10
#上传dist文件
spawn scp -r /Users/liyuanchen/Documents/workspace/Autonomy/my-autonomy/dist root@nnsam.cn:/home
expect "password"
send "${password}\n"
expect "*#"
#ssh登录Linux服务器
spawn  ssh root@nnsam.cn
expect {
    "password" 
    {
      send "${password}\n"
    }
}
expect "*#"
#切换到源码路径，备份当前线上代码，替换为新的代码即dist文件
send "cd /home\r"
expect "*#"

send "mv  diary  diary`date +%m%d`\r"
expect "*#"
send "mv dist diary\r"
expect "*#"
expect eof


