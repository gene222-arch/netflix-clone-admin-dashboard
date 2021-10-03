print("How many courses enrolled?")
courseGrade = ["CC 101 grade: ", "CC 102 grade: ", "MS 101 grade: ", "GE 101 grade: ", "GE 102 grade: ", "PE 101 grade: ", "RS 101 grade: "]
  
total = 0
for i in courseGrade:
  print(i)
  total += int(input())

print("Average grade is: "+str(total / int( len(courseGrade) ) ) )