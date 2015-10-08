#!/bin/bash

mkdir tmp
current_dir=`pwd`
cd tmp
git clone https://github.com/facebook/react-native
cd react-native/react-native-gradle
gradle install
cd $current_dir
rm -rf tmp