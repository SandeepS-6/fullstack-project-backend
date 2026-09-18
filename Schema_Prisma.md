Modal Fields all types:

A model Filed has 3 main parts - id, string, unqiue/required/etc

DataTypes:
1.string
2.boolean
3.int
4.float
5.DateTime

? with this is not required that filed.
? without this must be required

Ex:
age int ? [not required]
description string [required]

Attributes :
1.@id primary key [uniquely identify]
2.@default(autoincrement()) -> generating value automatic [no value then generate something but don't make it empty]
autoincrement() -> is for only numeric values only not other data types
3.@unqiue -> all values must be unqiue
4.@default(now()) -> current date
5.@updatedAt -> update the exisiting timestamps

corrections:
.Prisma Data-types start with a capital letter:
. uniquley (no) unique(yes).
. The model pattern is name DataType @attribute

model Project{
id INT @id @default(aut())
name String @unique
description String?
createdAt DateTime @default(now())
updateAt DateTime @updatedAt

}
