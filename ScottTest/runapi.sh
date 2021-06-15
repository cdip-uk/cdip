#!/bin/bash

cd API
node index.js & node test.js && fg
cd ..

