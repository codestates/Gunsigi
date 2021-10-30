#!/bin/bash
# aws cli 통해서 환경변수 받고 python으로 파싱해서 환경변수 파일 생성
aws ssm get-parameters-by-path --path /Gunsigi --query Parameters | \
python3 -c '
import json, sys
print("\n".join([param["Name"].rsplit("/", 1)[-1]+"="+param["Value"] for param in json.load(sys.stdin)]))
' > .env.production