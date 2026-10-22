#Executable creation 'LightBot'
all: main.o Application.o Button.o Cell.o Grid.o Interface.o ProgramBox.o ProgramHandler.o Robot.o Theme.o Utils.o
	g++ main.o Application.o Button.o Cell.o Grid.o Interface.o ProgramBox.o ProgramHandler.o Robot.o Theme.o Utils.o -o LightBot -lsfml-graphics -lsfml-window -lsfml-system

main.o: main.cpp Application.h Button.h Cell.h Grid.h Interface.h ProgramBox.h ProgramHandler.h Robot.h Theme.h Utils.h
	g++ -c -std=c++17 main.cpp -o main.o

Application.o: Application.cpp
	g++ -c -std=c++17 Application.cpp -o Application.o

Button.o: Button.cpp
	g++ -c -std=c++17 Button.cpp -o Button.o

Cell.o: Cell.cpp
	g++ -c -std=c++17 Cell.cpp -o Cell.o

Grid.o: Grid.cpp
	g++ -c -std=c++17 Grid.cpp -o Grid.o

Interface.o: Interface.cpp
	g++ -c -std=c++17 Interface.cpp -o Interface.o

ProgramBox.o: ProgramBox.cpp
	g++ -c -std=c++17 ProgramBox.cpp -o ProgramBox.o

ProgramHandler.o: ProgramHandler.cpp
	g++ -c -std=c++17 ProgramHandler.cpp -o ProgramHandler.o

Robot.o: Robot.cpp
	g++ -c -std=c++17 Robot.cpp -o Robot.o

Theme.o: Theme.cpp
	g++ -c -std=c++17 Theme.cpp -o Theme.o

Utils.o: Utils.cpp
	g++ -c -std=c++17 Utils.cpp -o Utils.o

#Clean temporary files
clean:
	rm -rf *.o

