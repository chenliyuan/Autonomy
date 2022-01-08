#!/bin/bash
password="Snowypml188"



for i in "$@"
do
	echo $i
	expect <<EOF
	spawn scp /Users/chenliyuan/Documents/NodeServer/$i root@nnsam.cn:/usr/local/src/NodeServer
	set timeout 10
	expect {
		 "password" 
		 {
		 	send "${password}\n"
		 }
	}
	expect eof
EOF
done





expect <<!!
set timeout 10
spawn  ssh root@nnsam.cn
expect {
	 "password" 
	 {
	 	send "${password}\n"
	 }
}
expect "*#"
send "cd /usr/local/src/NodeServer\r"
expect "*#"
# send "nohup node data.js > nodelog.log 2>&1 & \r"
interact
expect eof
!!


